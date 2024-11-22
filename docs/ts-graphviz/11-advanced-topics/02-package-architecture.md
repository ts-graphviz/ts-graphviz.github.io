---
description: Package architecture of ts-graphviz.
---
# Package Architecture

**ts-graphviz** consists of several packages, each with a specific role:

- **`ts-graphviz`** (Main Package): Provides high-level APIs for creating and manipulating graphs, suitable for most users.

- **`@ts-graphviz/core`**: Contains core implementations of models and functions, used internally and available for advanced use.

- **`@ts-graphviz/common`**: Aggregates Graphviz domain knowledge, providing type definitions, constants, and utilities. Supports use cases like extending custom types and attributes.

- **`@ts-graphviz/ast`**: Offers tools for parsing, manipulating, and generating DOT language graphs at the AST level.

- **`@ts-graphviz/adapter`**: Executes Graphviz commands in various runtime environments (Node.js, Deno) and converts DOT strings to images.

- **`@ts-graphviz/react`**: Allows defining graphs using React's declarative UI paradigm, expressing DOT language models with JSX.

## Dependency Graph

The relationships between packages can be visualized as follows:

![Dependency Graph](./img/dependency-graph.svg)

This modular architecture ensures:

- **Maintainability**: Individual packages can be maintained and updated without affecting others.

- **Flexibility**: Users can select only the packages needed for their specific use cases.

- **Extensibility**: Facilitates the addition of new features or packages as the library evolves.
