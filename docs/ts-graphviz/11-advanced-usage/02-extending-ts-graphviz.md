---
description: How to extend ts-graphviz with custom classes.
---
# Extending ts-graphviz

`ts-graphviz` is designed to be extensible, allowing advanced users to customize and enhance the library's functionality to meet specific needs. This section covers how to extend the type system and create custom implementations.

## Creating Custom Classes

You can add your own implementations by inheriting from existing classes. This allows you to define custom behavior or default attributes for your graph elements.

```typescript
import { Digraph, Node, Edge, EdgeTargetTuple, attribute as _, toDot } from 'ts-graphviz';

class MyCustomDigraph extends Digraph {
  constructor() {
    super('G', {
      [_.label]: 'This is Custom Digraph',
    });
  }
}

class MyCustomNode extends Node {
  constructor(id: string) {
    super(`node_${id}`, {
      [_.label]: `This is Custom Node ${id}`,
    });
  }
}

class MyCustomEdge extends Edge {
  constructor(targets: EdgeTargetTuple) {
    super(targets, {
      [_.label]: 'This is Custom Edge',
    });
  }
}

const digraph = new MyCustomDigraph();
const node1 = new MyCustomNode('A');
const node2 = new MyCustomNode('B');
const edge = new MyCustomEdge([node1, node2]);
digraph.addNode(node1);
digraph.addNode(node2);
digraph.addEdge(edge);

const dot = toDot(digraph);
console.log(dot);
/* Output:
digraph "G" {
  label = "This is Custom Digraph";
  "node_A" [
    label = "This is Custom Node A";
  ];
  "node_B" [
    label = "This is Custom Node B";
  ];
  "node_A" -> "node_B" [
    label = "This is Custom Edge";
  ];
}
*/
```

### Models Context API (`with` method)

You can also use the **Models Context API** to create custom classes for objects generated inside a graph. The `with` methods of `Digraph`, `Graph`, and `Subgraph` allow you to predefine custom models.

```typescript
const g = new Digraph();
g.with({
  Node: MyCustomNode,
  Edge: MyCustomEdge,
});

const a = g.createNode('A'); // Instance of MyCustomNode
const b = g.createNode('B'); // Instance of MyCustomNode
g.createEdge([a, b]);        // Instance of MyCustomEdge

const dot = toDot(g);
console.log(dot);
/* Output:
digraph {
  "node_A" [
    label = "This is Custom Node A";
  ];
  "node_B" [
    label = "This is Custom Node B";
  ];
  "node_A" -> "node_B" [
    label = "This is Custom Edge";
  ];
}
*/
```

## Extending the Type System

With `ts-graphviz`, you can extend the library's type system to customize graph visualization solutions. This is useful when you need to specify custom graph layouts, output formats, or add custom attributes not supported by default.

### Customization with the `$` Symbol

To allow for customization, types intended for extension are named with the `$` symbol. If you need to extend a type definition not listed below, check the source code to see if it can be extended with `$...`. If not, please create an issue or pull request.

### Use Cases

#### Specifying Custom Graph Layout and Output Formats

You can specify custom layout algorithms and output formats by extending the types in `@ts-graphviz/adapter`. Here's how:

```typescript
import { $keywords } from '@ts-graphviz/common';
import { toFile } from '@ts-graphviz/adapter';

// 1. Declare the '@ts-graphviz/adapter' module.
declare module '@ts-graphviz/adapter' {
  export namespace Layout {
    // 2. Define the $values interface in the Layout namespace.
    // 3. Extend $keywords with the name of your custom layout algorithm.
    export interface $values extends $keywords<'my-custom-algorithm'> {}
  }

  export namespace Format {
    // 4. Define the $values interface in the Format namespace.
    // 5. Extend $keywords with the name of your custom output format.
    export interface $values extends $keywords<'mp4'> {}
  }
}

// Now you can use your custom layout and format.
toFile('digraph { a -> b }', '/path/to/file', {
  layout: 'my-custom-algorithm',
  format: 'mp4',
});
```

#### Adding Custom Attributes

You can add custom attributes by extending the types in `@ts-graphviz/common`:

```typescript
import { $keywords } from '@ts-graphviz/common';
import { digraph, toDot, attribute as _ } from 'ts-graphviz';

// 1. Declare the '@ts-graphviz/common' module.
declare module '@ts-graphviz/common' {
  export namespace GraphAttributeKey {
    // 2. Define the $values interface in the GraphAttributeKey namespace.
    // 3. Extend $keywords with the name of your custom attribute.
    export interface $values extends $keywords<'hoge'> {}
  }

  export namespace Attribute {
    // 4. Define the $keys interface in the Attribute namespace.
    // 5. Extend $keywords with the name of your custom attribute.
    export interface $keys extends $keywords<'hoge'> {}

    // 6. Define the $types interface in the Attribute namespace.
    // 7. Specify the type of your custom attribute.
    export interface $types {
      hoge: string;
    }
  }
}

// Now you can use your custom attribute.
console.log(
  toDot(
    digraph((g) => {
      g.set(_.hoge, 'fuga');
    }),
  ),
);
```
