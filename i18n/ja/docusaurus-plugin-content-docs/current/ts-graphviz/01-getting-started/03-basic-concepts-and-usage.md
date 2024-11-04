---
description: グラフを構築・操作するためのts-graphvizの基本を理解する
---
# 基本的な概念と使い方

このセクションでは、`ts-graphviz` の基本的な概念と、グラフを構築する方法について説明します。

## ノードの作成

ノードはグラフの基本単位であり、エンティティやオブジェクトを表します。

```typescript
g.node('Node1', { label: 'My Node', color: 'red' });
```

**解説:**

- **ノード識別子**：`'Node1'` はノードの一意の識別子です。
- **属性**：`label` や `color` などの属性を指定して、ノードの見た目をカスタマイズできます。

**属性の例:**

- `label`：ノード上に表示されるテキスト。
- `color`：ノードの色。
- `shape`：ノードの形状（例：`box`、`circle`、`diamond`）。

## エッジの作成

エッジはノード間の関係や接続を表します。

```typescript
g.edge(['Node1', 'Node2'], { label: 'Edge Label', color: 'blue' });
```

**解説:**

- **ノードの接続**：`['Node1', 'Node2']` を使用してノード間のエッジを定義します。
- **属性**：エッジに対して `label` や `color` などの属性を指定できます。

**属性の例:**

- `label`：エッジ上に表示されるテキスト。
- `color`：エッジの色。
- `style`：エッジのスタイル（例：`dashed`、`bold`）。

## サブグラフの使用

サブグラフを使用すると、ノードやエッジをグループ化できます。これは、クラスターを作成したりレイアウトを制御したりするのに役立ちます。

```typescript
g.subgraph('ClusterA', { label: 'Cluster A' }, (cluster) => {
  cluster.node('A1');
  cluster.node('A2');
  cluster.edge(['A1', 'A2']);
});
```

**解説:**

- **サブグラフの作成**：`subgraph` メソッドを使用して `'ClusterA'` という名前のサブグラフを作成します。
- **サブグラフの属性**：`label` などの属性を設定してサブグラフに名前を付けます。
- **ノードとエッジの追加**：コールバック関数で提供されるサブグラフのコンテキスト内でノードとエッジを定義します。

---

## 最後に

**例:**

```typescript
digraph('G', { newrank: true }, (g) => {
  g.node('Node1', { label: 'My Node 1', color: 'red' });
  g.node('Node2', { label: 'My Node 2', color: 'green' });

  g.edge(['Node1', 'Node2'], { label: 'Edge Label', color: 'blue' });
  g.subgraph('ClusterA', { label: 'Cluster A' }, (cluster) => {
    cluster.node('A1');
    cluster.node('A2');
    cluster.edge(['A1', 'A2']);
  });
});
```

**ビジュアル表現:**

![基本的な使い方](./img/basic-usage.svg)
