---
description: カスタムクラスでts-graphvizを拡張する方法
---
# ts-graphviz の拡張

`ts-graphviz` は拡張可能な設計となっており、上級ユーザーが特定のニーズに合わせてライブラリの機能をカスタマイズ・強化できます。このセクションでは、型システムの拡張やカスタム実装の作成方法について説明します。

## カスタムクラスの作成

既存のクラスを継承して独自の実装を追加できます。これにより、グラフ要素にカスタムの動作やデフォルトの属性を定義できます。

```typescript
import { Digraph, Node, Edge, EdgeTargetTuple, attribute as _, toDot } from 'ts-graphviz';

class MyCustomDigraph extends Digraph {
  constructor() {
    super('G', {
      [_.label]: 'これはカスタム有向グラフです',
    });
  }
}

class MyCustomNode extends Node {
  constructor(id: string) {
    super(`node_${id}`, {
      [_.label]: `これはカスタムノード ${id} です`,
    });
  }
}

class MyCustomEdge extends Edge {
  constructor(targets: EdgeTargetTuple) {
    super(targets, {
      [_.label]: 'これはカスタムエッジです',
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
/* 出力:
digraph "G" {
  label = "これはカスタム有向グラフです";
  "node_A" [
    label = "これはカスタムノード A です";
  ];
  "node_B" [
    label = "これはカスタムノード B です";
  ];
  "node_A" -> "node_B" [
    label = "これはカスタムエッジです";
  ];
}
*/
```

### モデルコンテキスト API（`with` メソッド）

**モデルコンテキスト API** を使用して、グラフ内で生成されるオブジェクトにカスタムクラスを作成できます。`Digraph`、`Graph`、`Subgraph` の `with` メソッドを使用してカスタムモデルを事前定義できます。

```typescript
const g = new Digraph();
g.with({
  Node: MyCustomNode,
  Edge: MyCustomEdge,
});

const a = g.createNode('A'); // MyCustomNode のインスタンス
const b = g.createNode('B'); // MyCustomNode のインスタンス
g.createEdge([a, b]);        // MyCustomEdge のインスタンス

const dot = toDot(g);
console.log(dot);
/* 出力:
digraph {
  "node_A" [
    label = "これはカスタムノード A です";
  ];
  "node_B" [
    label = "これはカスタムノード B です";
  ];
  "node_A" -> "node_B" [
    label = "これはカスタムエッジです";
  ];
}
*/
```

## 型システムの拡張

`ts-graphviz` では、ライブラリの型システムを拡張してグラフの視覚化ソリューションをカスタマイズできます。これは、デフォルトでサポートされていないカスタムのグラフレイアウト、出力形式、またはカスタム属性を指定する必要がある場合に便利です。

### `$` 記号を使用したカスタマイズ

カスタマイズを可能にするため、拡張対象の型は `$` 記号で名前付けされています。以下に記載されていない型定義を拡張する必要がある場合、ソースコードを確認して `$...` で拡張可能か確認してください。それができない場合は、issue やプルリクエストを作成してください。

### ユースケース

#### カスタムのグラフレイアウトと出力形式の指定

`@ts-graphviz/adapter` の型を拡張することで、カスタムのレイアウトアルゴリズムや出力形式を指定できます。以下の方法で行います。

```typescript
import { $keywords } from '@ts-graphviz/common';
import { toFile } from '@ts-graphviz/adapter';

// 1. '@ts-graphviz/adapter' モジュールを宣言します。
declare module '@ts-graphviz/adapter' {
  export namespace Layout {
    // 2. Layout 名前空間で $values インターフェースを定義します。
    // 3. $keywords を継承し、カスタムレイアウトアルゴリズムの名前を指定します。
    export interface $values extends $keywords<'my-custom-algorithm'> {}
  }

  export namespace Format {
    // 4. Format 名前空間で $values インターフェースを定義します。
    // 5. $keywords を継承し、カスタム出力形式の名前を指定します。
    export interface $values extends $keywords<'mp4'> {}
  }
}

// これでカスタムレイアウトと形式を使用できます。
toFile('digraph { a -> b }', '/path/to/file', {
  layout: 'my-custom-algorithm',
  format: 'mp4',
});
```

#### カスタム属性の追加

`@ts-graphviz/common` の型を拡張してカスタム属性を追加できます。

```typescript
import { $keywords } from '@ts-graphviz/common';
import { digraph, toDot, attribute as _ } from 'ts-graphviz';

// 1. '@ts-graphviz/common' モジュールを宣言します。
declare module '@ts-graphviz/common' {
  export namespace GraphAttributeKey {
    // 2. GraphAttributeKey 名前空間で $values インターフェースを定義します。
    // 3. $keywords を継承し、カスタム属性の名前を指定します。
    export interface $values extends $keywords<'hoge'> {}
  }

  export namespace Attribute {
    // 4. Attribute 名前空間で $keys インターフェースを定義します。
    // 5. $keywords を継承し、カスタム属性の名前を指定します。
    export interface $keys extends $keywords<'hoge'> {}

    // 6. Attribute 名前空間で $types インターフェースを定義します。
    // 7. カスタム属性のキーとその対応する値の型を指定します。
    export interface $types {
      hoge: string;
    }
  }
}

// これでカスタム属性を使用できます。
console.log(
  toDot(
    digraph((g) => {
      g.set(_.hoge, 'fuga');
    }),
  ),
);
```
