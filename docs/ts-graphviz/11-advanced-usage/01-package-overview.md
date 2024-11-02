---
sidebar_position: 1
---
# Package Overview

For users interested in extending or customizing `ts-graphviz`, understanding the internal packages can be valuable. Below is an overview of the internal packages and how they can be used in advanced scenarios.


## `@ts-graphviz/adapter`

**Purpose**: Provides interfaces to execute Graphviz commands and convert DOT language strings into various output formats.

**Usage**:

- Convert DOT strings to streams or files.
- Use in environments where you need to render graphs to images or other formats.

## `@ts-graphviz/ast`

**Purpose**: Allows manipulation of the DOT language at the Abstract Syntax Tree (AST) level.

**Usage**:

- Parse DOT strings into AST nodes.
- Manipulate and transform the AST programmatically.
- Useful for advanced analysis or transformations of existing DOT code.

## `@ts-graphviz/common`

**Purpose**: Centralizes Graphviz domain knowledge, providing type definitions, constants, and utilities. It is designed to handle use cases such as extending custom types.

**Usage**:

- Extend or customize types and attributes.
- Ensure type safety when working with custom attributes.
- Aggregate domain knowledge of Graphviz for consistent usage across packages.

## `@ts-graphviz/core`

**Purpose**: Contains the core implementations of the models and functions provided to users.

**Usage**:

- Use object-oriented APIs for fine-grained control over graph elements.
- Extend classes for custom behaviors or attributes.
