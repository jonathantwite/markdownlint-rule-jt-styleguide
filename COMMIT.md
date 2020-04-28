# Commit Messages

## Format

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

## Types

* init
* feat
* fix
* docs
* style
* refactor
* test
* chore

## Scopes

* &lt;rule name&gt;
* Project
* Environment
* Build

## Footer

* BREAKING CHANGE:
* BREAKING CHANGES:
* TODO:
* Closes

## Example

```
fix(left-nav-container): fixed incorrect number of menu items showing

Changed the method of calculating which items show in the left hand menu.
Uses a new user preference value: menu-detail-level.

BREAKING CHANGE: left-nav-container now requires the menu-detail-level prop.
TODO: Allow user to alter menu-detail-level in user preferences screen.
Closes #123
