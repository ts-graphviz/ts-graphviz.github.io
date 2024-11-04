---
sidebar_position: 3
---

# 基本概念と使い方

## グラフの基本要素

### ノード

ノードはグラフの基本的な構成要素です。属性を設定して外観や動作を制御できます。

```ts
g.node('A', { label: 'Node A', color: 'red' });
```

### エッジ

エッジはノード間の関係性を表します。

```ts
g.edge(['A', 'B'], { label: 'Edge from A to B', color: 'blue' });
```


### サブグラフとクラスター

サブグラフを使用して、グラフ内にグループ化やクラスターを作成できます。

```ts
g.subgraph('cluster_0', (sub) => {
  sub.node('A');
  sub.node('B');
  sub.edge(['A', 'B']);
  sub.set({ label: 'Cluster 0' });
});
```

### グラフ全体の属性

グラフ自体に属性を設定して、全体のレイアウトやスタイルを制御できます。

```ts
const G = digraph('G', (g) => {
  g.set('rankdir', 'LR');
});
```
