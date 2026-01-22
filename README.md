# Loopit Payment Method SDK

Vue.js SDK for managing payment methods in Laravel Blade templates. Supports Stripe card payments only.

## Features

- **Add a payment method** - Stripe card form with cardholder name
- **Display selected payment method** - Shows card brand image, last 4 digits
- **Remove payment method** - Clear selection
- **Returns payment_method_id** - For separate payment collection

## Installation

### Via Script Tag (Recommended for Laravel Blade)

Copy the built files from `dist/` to your Laravel `public/` folder:

```bash
# Copy SDK files to Laravel public folder
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
    <!-- billing address fields -->
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
    workspace: '{{ config("services.loopit.workspace") }}',
    microsite: '{{ config("services.loopit.microsite") }}',
    ownerId: '{{ $ownerId }}',
    ownerType: '{{ $ownerType }}',

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
| `onPaymentMethodAdded` | `function` | No | Callback when payment method is added |
| `onPaymentMethodRemoved` | `function` | No | Callback when payment method is removed |
| `onError` | `function` | No | Callback when an error occurs |

## Callbacks

### onPaymentMethodAdded(paymentMethod)

Called when a payment method is successfully added.

```javascript
onPaymentMethodAdded: function(paymentMethod) {
    console.log('ID:', paymentMethod.id);
    console.log('Brand:', paymentMethod.brand);
    console.log('Last 4:', paymentMethod.last_4);
    console.log('Expires:', paymentMethod.expires);
}
```

### onPaymentMethodRemoved()

Called when the payment method is removed.

```javascript
onPaymentMethodRemoved: function() {
    document.getElementById('payment_method_id').value = '';
}
```

### onError(error)

Called when an error occurs.

```javascript
onError: function(error) {
    console.error('Error:', error.message);
}
```

## API Endpoints

The SDK uses these Loopit API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/payment/config` | GET | Get Stripe publishable key |
| `/payment-methods/setup-config` | POST | Get Stripe SetupIntent |
| `/payment-methods/add` | POST | Save payment method |

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
├── loopit-payment-method.umd.js   # UMD bundle (for script tag)
├── loopit-payment-method.es.js    # ES module bundle
└── loopit-payment-method.css      # Styles
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Requirements

- Stripe.js must be loaded before the SDK
- Valid Loopit API credentials
- Stripe card payment configuration in Loopit

## License

MIT
