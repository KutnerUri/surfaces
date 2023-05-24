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

## Show Your Support

If you find this project interesting or helpful, consider giving a star to this [repository](https://github.com/kutneruri/automatic-elevation-surfaces). Your support encourages me to keep exploring and improving. Enjoy the journey with us!
