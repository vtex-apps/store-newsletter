📢 Use this project, [contribute](https://github.com/vtex-apps/store-newsletter) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Store Newsletter

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Store Newsletter app provides a set of blocks that you can use to create a newsletter subscription form.

![Media Placeholder](https://user-images.githubusercontent.com/52087100/71204177-42ca4f80-227e-11ea-89e6-e92e65370c69.png)

## Configuration

1. Add `vtex.store-newsletter` to your app's dependencies in the `manifest.json` file:

```json
{
  "dependencies": {
    "vtex.store-newsletter": "0.x"
  }
}
```

Now, you are able to use all blocks exported by the `store-newsletter` app. Check out the full list below:

| Block name               | Description                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `newsletter-form`        | ![mandatory](https://img.shields.io/badge/-Mandatory-red) Top level block that provides context to all its children. |
| `newsletter-input-email` | ![mandatory](https://img.shields.io/badge/-Mandatory-red) Renders an email input in the newsletter form.             |
| `newsletter-input-name`  | Renders an name input in the newsletter form.                                                                        |
| `newsletter-submit`      | ![mandatory](https://img.shields.io/badge/-Mandatory-red) Submit button for the newsletter form.                     |

2. In any desired store template, such as the `store.home`, add the `newsletter-form` block and it's children:

```json
{
  "store.home": {
    "children": ["newsletter-form"]
  },

  "newsletter-form": {
    "children": [
      "newsletter-input-email",
      "newsletter-input-name",
      "newsletter-submit"
    ]
  }
}
```

### `newsletter-form` props

| Prop name      | Type    | Description                                                                                                                                                                                              | Default value |
| -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `ErrorState`   | `block` | Store Framework block to be rendered if the `subscribeNewsletter` mutation fails. If none is passed, the default `Error` component will be rendered.                                                     | `undefined`   |
| `SuccessState` | `block` | Store Framework block to be rendered if the `subscribeNewsletter` mutation succeeds. If none is passed, the default `Success` component will be rendered.                                                | `undefined`   |
| `LoadingState` | `block` | Store Framework block to be rendered while the `subscribeNewsletter` mutation is loading. If none is passed, the default behavior is for the submit button to show a spinner during this loading period. | `undefined`   |

### `newsletter-input-email` props

| Prop name         | Type     | Description                                    | Default value                                                              |
| ----------------- | -------- | ---------------------------------------------- | -------------------------------------------------------------------------- |
| `placeholderText` | `string` | Placeholder text for email input.              | `"Enter your email address"` (translated according to the store's locale). |
| `inputLabel`      | `string` | Label for the email input.                     | `""`                                                                       |
| `errorMessage`    | `string` | Error message to be shown if email is invalid. | `Invalid email address"` (translated according to the store's locale).     |

### `newsletter-input-name` props

| Prop name         | Type     | Description                                       | Default value                                                     |
| ----------------- | -------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| `placeholderText` | `string` | Placeholder text for name input.                  | `"Enter your name"` (translated according to the store's locale). |
| `inputLabel`      | `string` | Label for the name input.                         | `""`                                                              |
| `errorMessage`    | `string` | Error message to be shown if name input is empty. | `"Invalid name"` (translated according to the store's locale).    |

### `newsletter-submit` props

| Prop name           | Type     | Description                                 | Default value                                               |
| ------------------- | -------- | ------------------------------------------- | ----------------------------------------------------------- |
| `submitButtonLabel` | `string` | Text displayed inside of the submit button. | `"Subscribe"` (translated according to the store's locale). |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles               |
| ------------------------- |
| `defaultErrorContainer`   |
| `defaultErrorMessage`     |
| `defaultSuccessContainer` |
| `defaultSuccessMessage`   |
| `emailInputContainer`     |
| `emailInputLabel`         |
| `formSubmitContainer`     |
| `nameInputContainer`      |
| `nameInputLabel`          |
| `newsletterContainer`     |
| `newsletterForm`          |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
