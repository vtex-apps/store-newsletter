📢 Use this project, [contribute](https://github.com/vtex-apps/store-newsletter) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Store Newsletter

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Store Newsletter app provides a set of blocks that you can use to create a newsletter subscription form.

![newsletter-demo](https://user-images.githubusercontent.com/27777263/96277790-1c169b80-0fab-11eb-99cb-6b55ea7f5b7f.png)

## Configuration

1. Add `vtex.store-newsletter` to your app's dependencies in the `manifest.json` file:

```diff
 "dependencies": {
+  "vtex.store-newsletter": "1.x"
 }
```

Now, you are able to use all blocks exported by the `store-newsletter` app. Check out the full list below:

| Block name               | Description                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `newsletter-form`        | ![mandatory](https://img.shields.io/badge/-Mandatory-red) Top level block that provides context to all its children. |
| `newsletter-input-email` | ![mandatory](https://img.shields.io/badge/-Mandatory-red) Renders an email input in the newsletter form.             |
| `newsletter-input-name`  | Renders an name input in the newsletter form.                                                                        |
| `newsletter-input-phone` | Renders an phone input in the newsletter form.                                                                       |
| `newsletter-submit`      | ![mandatory](https://img.shields.io/badge/-Mandatory-red) Renders a `Submit` button for the newsletter form.         |

2. In the desired store template, such as the `store.home`, add the `newsletter-form` block and its desired children:

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

| Prop name      | Type    | Description                                                                                                                                                               | Default value |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `ErrorState`   | `block` | Block to be rendered if the submission of the form fails. If none is passed, a default error component will be rendered.                                                  | `undefined`   |
| `SuccessState` | `block` | Block to be rendered if form submission succeeds. If none is passed, a default success component will be rendered.                                                        | `undefined`   |
| `LoadingState` | `block` | Block to be rendered while the form submission is loading. If none is passed, the default behavior is for the submit button to show a spinner during this loading period. | `undefined`   |

### `newsletter-input-email` props

| Prop name         | Type     | Description                                    | Default value                                                            |
| ----------------- | -------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
| `placeholderText` | `string` | Placeholder text for the email input.          | `Enter your email address` (translated according to the store's locale). |
| `inputLabel`      | `string` | Label for the email input.                     | `null`                                                                   |
| `errorMessage`    | `string` | Error message to be shown if email is invalid. | `Invalid email address` (translated according to the store's locale).    |

### `newsletter-input-name` props

| Prop name         | Type     | Description                                       | Default value                                                   |
| ----------------- | -------- | ------------------------------------------------- | --------------------------------------------------------------- |
| `placeholderText` | `string` | Placeholder text for name input.                  | `Enter your name` (translated according to the store's locale). |
| `inputLabel`      | `string` | Label for the name input.                         | `null`                                                          |
| `errorMessage`    | `string` | Error message to be shown if name input is empty. | `Invalid name` (translated according to the store's locale).    |

### `newsletter-input-phone` props

| Prop name         | Type     | Description                                        | Default value                                                    |
| ----------------- | -------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| `placeholderText` | `string` | Placeholder text for phone input.                  | `Enter your phone` (translated according to the store's locale). |
| `inputLabel`      | `string` | Label for the phone input.                         | `null`                                                           |
| `errorMessage`    | `string` | Error message to be shown if phone input is empty. | `Invalid phone` (translated according to the store's locale).    |

### `newsletter-submit` props

| Prop name           | Type     | Description                          | Default value                                             |
| ------------------- | -------- | ------------------------------------ | --------------------------------------------------------- |
| `submitButtonLabel` | `string` | Text displayed on the submit button. | `Subscribe` (translated according to the store's locale). |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles             |
| ----------------------- |
| `defaultErrorMessage`   |
| `defaultSuccessMessage` |
| `emailInputContainer`   |
| `emailInputLabel`       |
| `formSubmitContainer`   |
| `nameInputContainer`    |
| `nameInputLabel`        |
| `phoneInputContainer`   |
| `phoneInputLabel`       |
| `newsletterForm`        |

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
