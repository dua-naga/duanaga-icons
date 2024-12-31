# Duanaga Icons

This package provides a simple Vue.js component to easily incorporate Material Symbols icons into your project. Material Symbols are a versatile set of icons suitable for various applications.

## Installation

You can install the package via npm:

```sh
npm install duanaga-icons
```

or via yarn:

```sh
yarn add duanaga-icons
```

## Usage

First, import the `Icon` component into your Vue application:

```vue
<script setup lang="ts">
import 'duanaga-icons/dist/style.css'
import Icon from 'duanaga-icons'
</script>

<template>
  <div>
    <Icon name="home" />
  </div>
</template>
```

## Props

The `Icon` component accepts the following props:

- `name` (string, required): The name of the Material Symbol icon.
- `filled` (boolean, optional): Whether the icon should be filled. Default is `false`.
- `size` (number | string, optional): The size of the icon. Default is `24`.

## Example

```vue
<script setup lang="ts">
import 'duanaga-icons/dist/style.css'
import Icon from 'duanaga-icons'
</script>

<template>
  <div>
    <Icon name="add_circle" :size="30" filled />
    <Icon name="delete" :size="30" />
    <Icon name="search" :size="30" />
  </div>
</template>
```

## Style Customization

If you want to customize the icon style, just override this:

```css
.duanaga-icon {
  color: inherit;
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
}
```
