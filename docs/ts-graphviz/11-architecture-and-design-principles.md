---
sidebar_position: 11
---
# Architecture and Design Principles

Understanding the architecture and design principles of `ts-graphviz` can help you utilize the library more effectively and contribute to its development.

## Design Principles

### Key Concepts

`ts-graphviz` is built around several key concepts that make it modular, extensible, and easy to use:

1. **TypeScript-First Design & Type Definitions**: Designed primarily for TypeScript, providing strong typing and seamless integration with TypeScript projects. The library includes comprehensive type definitions for DOT language elements, enabling type-safe interactions with Graphviz elements.

2. **Object-Oriented API**: Provides an object-oriented API for creating and manipulating graph elements like graphs, nodes, and edges. This makes working with complex graph structures intuitive and efficient.

3. **Modular Design**: Split into multiple packages, each serving a specific purpose. This modularity allows users to include only the functionality they need, improving maintainability and flexibility.

4. **AST Support**: Includes a module for processing the DOT language at the Abstract Syntax Tree (AST) level. This allows users to parse and generate DOT language while preserving its structure, making it easier to manipulate and transform graphs programmatically.

5. **Runtime Adapter**: Provides adapter functions that enable users to execute Graphviz commands across different runtime environments, such as Node.js and Deno. These adapters serve as a wrapper, allowing for seamless integration with various platforms.

6. **Extensibility**: Designed with extensibility in mind, allowing users to extend its functionality with custom implementations for specific use cases.

7. **Multi-Paradigm Support**: Accommodates various programming paradigms, such as Object-Oriented Programming, Declarative Programming, and Functional Programming. Users can choose the programming style that best suits their needs.

## Packages Architecture

`ts-graphviz` is composed of several packages:

| Package                                                                    | Version                                                                                               | Summary                                        | Description                                                                                                                                                   |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ts-graphviz](https://www.npmjs.com/package/ts-graphviz)                   | [![npm](https://img.shields.io/npm/v/ts-graphviz)](https://www.npmjs.com/package/ts-graphviz)         | Graphviz library for TypeScript                | The main package serving as the entry point. Provides a high-level API for creating, manipulating, and rendering Graphviz DOT language graphs.                 |
| [@ts-graphviz/common](https://www.npmjs.com/package/@ts-graphviz/common)   | [![npm](https://img.shields.io/npm/v/@ts-graphviz/common)](https://www.npmjs.com/package/@ts-graphviz/common) | Graphviz Types and Utilities                  | Contains type information related to DOT language attributes, attribute values, and models.                                                                    |
| [@ts-graphviz/ast](https://www.npmjs.com/package/@ts-graphviz/ast)         | [![npm](https://img.shields.io/npm/v/@ts-graphviz/ast)](https://www.npmjs.com/package/@ts-graphviz/ast)       | Graphviz AST Utilities                        | Includes modules for processing the DOT language at the AST (Abstract Syntax Tree) level.                                                                      |
| [@ts-graphviz/core](https://www.npmjs.com/package/@ts-graphviz/core)       | [![npm](https://img.shields.io/npm/v/@ts-graphviz/core)](https://www.npmjs.com/package/@ts-graphviz/core)     | Graphviz Models for Object-Oriented Programming | Comprises the implementation of models and functions provided to users.                                                                                        |
| [@ts-graphviz/adapter](https://www.npmjs.com/package/@ts-graphviz/adapter) | [![npm](https://img.shields.io/npm/v/@ts-graphviz/adapter)](https://www.npmjs.com/package/@ts-graphviz/adapter) | Graphviz Runtime Adapters for Cross Platform   | Handles runtime-dependent processing, such as input/output operations and renderer implementations for different environments.                                  |

These packages are designed to work together, allowing you to pick and choose the functionality you need.
