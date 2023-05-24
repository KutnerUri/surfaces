# Automatic Surface Elevation

Creating self-stacking surfaces with automatic elevation.

<!-- [screenshot here] -->

This project aims to simplify the process of visually differentiating and implying hierarchy among stacked surfaces on a webpage.

## The Challenge

In traditional bright websites (light mode), developers differentiate surfaces and imply hierarchy using shadows - a higher shadow implies more elevation. In dark mode websites, where shadows are less visible, developers start with a near-black gray and use progressively lighter (more white-gray) colors to indicate surfaces with higher elevation. The idea is that the "higher" a surface is, the "closer" it is to the user, which is visually represented as the **light source** of the page.

However, it can be challenging to use the elevation system for surfaces when working in distributed workspaces, as maintainers don't always know where their component will be used. This makes setting the elevation for their surface, i.e., the shadow size and background color, a difficult task.

## The Solution

In this repository, I am investigating these ideas and working on creating a surface that is automatically aware of its elevation, using React Context. I am also exploring accent colors (surfaces with a hue), CSS variables, and dynamic gradients.

If this project proves to be successful, I plan to package it in npm for easier use and distribution.

## Performance Considerations

While it might seem concerning that all of the surfaces in the app would be linked to a single elevation React context, I believe this is not a concern, because:

1. Surfaces should not be deeply nested in a well-designed user interface. Ideally, it should have 3-5 layers at most.
2. The context will be limited to the surfaces themselves, and re-rendering should therefore only be triggered for those HTML elements. React is very efficient in this regard, knowing not to re-render children unnecessarily.
3. A change in layout that triggers a context-wide elevation change should also cause React to re-render that entire part of the virtual DOM, so no additional performance penalty is incurred.

## Native Solutions

I explored several native CSS and HTML options while developing. However, each had its limitations:

### CSS Operators

CSS provides several operators that could potentially be used to manage elevation:

- `var()`: CSS variables allow data storage and can affect child elements, making them an apparent choice for managing elevation. However, they fall short as it's not possible to calculate them dynamically, i.e., you can't use `calc()` or `counter()` within `var()`.
- `counter()`: CSS counters could potentially track the nesting level of HTML elements. Despite finding a way to use counters for this purpose, they are not useful in this context as they can only be used in the `content` property.
- `attr()`: HTML attributes, like `data-layer=5`, could theoretically be used for styling surfaces and then reading their value in CSS. However, the `attr()` function has limited support for most properties, other than `content`.

````scss
.surface {
  // ❌ doesn't work
  --layer: calc(1 + var(--layer, 0));

  // ❌ doesn't work
  background: hsl(0, 0%, calc(20% + counter(layer) * 10%));

  counter-increment: layer;
  &::after {
    content: "";
    counter-increment: layer -1;
  }

  // ❌ doesn't work
  background: hsl(0, 0%, calc(20% + attr(data-layer) * 10%));
}
```

### Deeply Nested CSS Selectors

Another approach I considered involved using deeply nested CSS selectors:

```scss
.surface { background: $background01; }
.surface .surface { background: $background02; }
.surface .surface .surface { background: $background03; }
```

While this approach is valid and improves performance, it lacks advanced flexibility. For instance, it doesn't allow setting a surface directly to a higher elevation (like an overlay), or making relative jumps (like setting a +3 elevation card on top of another card).

While these native solutions provided valuable insights, they were not sufficient to fully address the challenge at hand. The need for a more flexible and efficient solution led to the creation of this project.

## Show Your Support

If you find this project interesting or helpful, consider giving a star to this [repository](https://github.com/kutneruri/automatic-elevation-surfaces). Your support encourages me to keep exploring and improving. Enjoy the journey with us!

## Further Reading

Interested in learning more about elevation in design systems? Here are some resources that discuss how different design systems handle elevation, especially in light and dark modes:

1. [**Material UI**](https://mui.com/customization/theming/#shadows): Discusses how shadows are used to create the impression of elevation. In dark mode, shadows are adjusted to be darker.
1. [**Atlassian Design System**](https://atlassian.design/foundations/elevation): Uses shadows to imply depth or lift. In dark mode, surface colors indicate elevation.
1. [**UX Collective**](https://uxdesign.cc/designing-dark-mode-c7bd200eaa64): Suggests replacing shadows with background color variations in dark mode.
1. [**ZenHub Blog**](https://blog.zenhub.com/improving-design-system-for-dark-mode-theming/): Discusses improving their design system for dark mode theming.
1. [**Apple Developer Documentation**](https://developer.apple.com/design/human-interface-guidelines/dark-mode): Provides guidelines for implementing dark mode in their Human Interface Guidelines.

These resources provide a variety of approaches to handling elevation, offering valuable insights for your own projects.
