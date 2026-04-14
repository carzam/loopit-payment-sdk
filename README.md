# Loopit Payment Method SDK

Vue.js SDK for managing payment methods in Laravel Blade templates. Supports **Stripe card** and **AU BECS Direct Debit** (`au_becs_debit`) payments. The payment method type is driven by your workspace gateway configuration — the SDK automatically renders the correct form.

## Features

- **Add a payment method** — card or AU BECS Direct Debit (driven by workspace config)
- **Dynamic type selector** — when multiple types are configured, a tab selector is shown automatically
- **`paymentMethodTypes` option** — restrict which types the integrator wants to show
- **Display selected payment method** — card brand image/last 4, or Direct Debit icon/account last 4
- **Remove payment method** — clear selection
- **Returns `payment_method_id`** — for separate payment collection

## Installation

### Via Script Tag (Recommended for Laravel Blade)

Copy the built files from `dist/` to your Laravel `public/` folder:

```bash
cp dist/loopit-payment-method.umd.js /path/to/laravel/public/js/
cp dist/loopit-payment-method.css /path/to/laravel/public/css/
```

Then include them in your Blade template:

```html
<!-- Stripe.js (required) -->
<script src="https://js.stripe.com/v3/"></script>

<!-- Loopit Payment Method SDK -->
<link rel="stylesheet" href="/css/loopit-payment-method.css">
<script src="/js/loopit-payment-method.umd.js"></script>
```

## Quick Start (Laravel Blade)

```blade
{{-- resources/views/checkout/payment.blade.php --}}
@extends('layouts.app')

@section('content')
<div id="loopit-payment-method"></div>

<form id="checkout-form">
    <input type="hidden" name="payment_method_id" id="payment_method_id">
    <button type="submit" id="submit-btn" disabled>Complete Booking</button>
</form>
@endsection

@section('scripts')
<script src="https://js.stripe.com/v3/"></script>
<link rel="stylesheet" href="/css/loopit-payment-method.css">
<script src="/js/loopit-payment-method.umd.js"></script>

<script>
LoopitPaymentMethod.mount('#loopit-payment-method', {
    apiBaseUrl: '{{ config("services.loopit.url") }}',
    workspace:  '{{ config("services.loopit.workspace") }}',
    microsite:  '{{ config("services.loopit.microsite") }}',
    ownerId:    '{{ $ownerId }}',
    ownerType:  '{{ $ownerType }}',

    // Optional: restrict which payment types to show.
    // Omit to show all types configured for the workspace.
    // paymentMethodTypes: ['card'],
    // paymentMethodTypes: ['au_becs_debit'],
    // paymentMethodTypes: ['card', 'au_becs_debit'],

    onPaymentMethodAdded: function(paymentMethod) {
        document.getElementById('payment_method_id').value = paymentMethod.id;
        document.getElementById('submit-btn').disabled = false;
    },

    onPaymentMethodRemoved: function() {
        document.getElementById('payment_method_id').value = '';
        document.getElementById('submit-btn').disabled = true;
    },

    onError: function(error) {
        alert('Error: ' + error.message);
    }
});
</script>
@endsection
```

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `apiBaseUrl` | `string` | Yes | Base URL for the Loopit API (e.g., `https://platform.api.loopit.co/api/portal`) |
| `workspace` | `string` | Yes | Workspace slug identifier |
| `microsite` | `string` | Yes | Microsite domain (e.g., `your-workspace.myloopit.com`) |
| `ownerId` | `string` | Yes | UUID of the person or company |
| `ownerType` | `string` | Yes | `'person'` or `'company'` |
| `paymentMethodTypes` | `string[]` | No | Restrict which types to show: `['card']`, `['au_becs_debit']`, or `['card', 'au_becs_debit']`. Omit to show all types configured for the workspace. |
| `onConfigLoaded` | `function` | No | Fired once the payment config is resolved. Receives the config object including `payment_method_type.type` |
| `onPaymentMethodAdded` | `function` | No | Callback when payment method is successfully added. Receives a `PaymentMethod` object |
| `onPaymentMethodRemoved` | `function` | No | Callback when payment method is removed |
| `onError` | `function` | No | Callback when an error occurs |

## Payment Method Types

The SDK reads available payment types from `GET /payment/configs` and renders accordingly:

| Type | Form behaviour |
|------|----------------|
| `card` | Cardholder name field + Stripe card fields. Button: **Save Card** |
| `au_becs_debit` | Stripe BECS fields (BSB + account number). Button: **Set up Direct Debit** |

When a workspace has **both** types configured (and `paymentMethodTypes` includes both), a tab selector is shown automatically — no extra code needed.

## Callbacks

### `onConfigLoaded(config)`

Fired as soon as the payment config is fetched from the API. Use this to know which payment type(s) are available before the user interacts.

```javascript
onConfigLoaded: function(config) {
    console.log('Payment type:', config.payment_method_type.type);
    // 'card' or 'au_becs_debit'
}
```

### `onPaymentMethodAdded(paymentMethod)`

Called when a payment method is successfully added.

```javascript
onPaymentMethodAdded: function(paymentMethod) {
    console.log('ID:',      paymentMethod.id);
    console.log('Type:',    paymentMethod.type);    // 'card' or 'au_becs_debit'
    console.log('Brand:',   paymentMethod.brand);
    console.log('Last 4:',  paymentMethod.last_4);
    // Card only:
    console.log('Expires:', paymentMethod.expires); // e.g. '2031-03-31T23:59:59.000000Z'
}
```

**Card response example:**
```json
{
    "id": "a189ce66-5d52-454e-b412-472450cde11c",
    "type": "card",
    "brand": "mastercard",
    "last_4": "4444",
    "cardholder_name": "John Doe",
    "expires": "2031-03-31T23:59:59.000000Z",
    "owner_id": "a0c29b4e-3903-472c-aadb-05c4a7420103",
    "owner_type": "person"
}
```

**AU BECS Direct Debit response example:**
```json
{
    "id": "b3f1a2c4-9e87-4d56-bc12-7a3f1e8d2c90",
    "type": "au_becs_debit",
    "brand": "au_becs_debit",
    "last_4": "032173...4383",
    "full_name": "Jane Smith",
    "expires": null,
    "external_id": "pm_1StyuOFQXEoapWu0eLvXhu9o",
    "is_default": 1,
    "owner_id": "a0e6eb88-6082-436a-9cb3-4bd03a606526",
    "owner_type": "company"
}
```

### `onPaymentMethodRemoved()`

Called when the payment method is removed.

```javascript
onPaymentMethodRemoved: function() {
    document.getElementById('payment_method_id').value = '';
}
```

### `onError(error)`

Called when an error occurs.

```javascript
onError: function(error) {
    console.error('Error:', error.message);
}
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/payment/configs` | GET | Get all payment configs for the workspace (card, au_becs_debit, etc.) |
| `/payment-methods/setup-config` | POST | Get Stripe SetupIntent client secret |
| `/payment-methods/add` | POST | Save payment method to Loopit |

## Building from Source

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build
```

### Output Files

```
dist/
├── loopit-payment-method.umd.js   # UMD bundle (for script tag / browser)
├── loopit-payment-method.es.js    # ES module bundle
└── loopit-payment-method.css      # Styles
```

## Requirements

- Stripe.js must be loaded before the SDK (`https://js.stripe.com/v3/`)
- Valid Loopit API credentials
- Workspace configured with at least one Stripe payment method (card or AU BECS Direct Debit)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
