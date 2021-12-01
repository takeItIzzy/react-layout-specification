# react-layout-specification (RLS)
A react library that helps developers agree on design specifications and adapt different specifications.

## Is RLS another react components library?

Yes or no. RLS only provides three components: Wrapper, Content, and a Spacer component that is only used internally.

RLS is not concerned with UI rendering, but rather is designed to facilitate the constraints of design specifications.

RLS assumes that your system has a complete set of specifications that cover element spacing, the position and order between elements and so on. And RLS can help you to establish this kind of standard without having to write layout styles at the implementation of your code.

There are two benefits to use RLS:

- It is easier to keep specifications globally unified.
- You can react faster when you need to migrate to another specification (For example, specification upgrades, or you as a supplier, the system docking with other platforms).