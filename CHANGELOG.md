# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Pixel event `newsletterSubscription`.

## [1.2.0] - 2021-02-03
### Added
- `FormHiddenField` component and `newsletter-hidden-field` block.
- `customFields` property to `NewsletterStateContext`, which can be set via the dispatch function returned by `useNewsletterDispatch`.

### Changed
- `NewsletterContext` is now exported.

## [1.1.0] - 2021-01-26
### Added
- `classes` prop to all exported components.

### Changed
- `vtex.css-handles` dependency is now on major `1.x`.

## [1.0.2] - 2020-12-10

### Fixed
- Hard Coded "Privacy Policy" in FormConfirmationCheckbox

## [1.0.1] - 2020-11-03

### Fixed

- Props listed with the wrong names in the docs.

## [1.0.0] - 2020-10-30

### Added

- Initial release.
