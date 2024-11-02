---
sidebar_position: 11
---
# アーキテクチャと設計原則

`ts-graphviz` のアーキテクチャと設計原則を理解することで、ライブラリをより効果的に活用し、その開発に貢献できます。

## 設計原則

### キーコンセプト

`ts-graphviz` は、モジュール性、拡張性、使いやすさを実現するために、いくつかの重要なコンセプトに基づいて構築されています。

1. **TypeScript ファーストの設計と型定義**：主に TypeScript 用に設計されており、強力な型定義と TypeScript プロジェクトへのシームレスな統合を提供します。ライブラリには DOT 言語要素の包括的な型定義が含まれており、Graphviz 要素との型安全なやり取りが可能です。

2. **オブジェクト指向 API**：グラフ、ノード、エッジなどのグラフ要素を作成および操作するためのオブジェクト指向 API を提供します。これにより、複雑なグラフ構造を直感的かつ効率的に操作できます。

3. **モジュール設計**：各パッケージが特定の目的を果たすように、複数のパッケージに分割されています。このモジュール性により、必要な機能のみを含めることができ、保守性と柔軟性が向上します。

4. **AST サポート**：抽象構文木（AST）レベルで DOT 言語を処理するためのモジュールを含んでいます。これにより、グラフをプログラム的に解析および生成する際に、その構造を保持しながら操作や変換が容易になります。

5. **ランタイムアダプター**：Node.js や Deno など、さまざまなランタイム環境で Graphviz コマンドを実行できるアダプター関数を提供します。これらのアダプターはラッパーとして機能し、さまざまなプラットフォームとのシームレスな統合を可能にします。

6. **拡張性**：特定のユースケースに合わせてカスタム実装で機能を拡張できるように設計されています。

7. **マルチパラダイムサポート**：オブジェクト指向プログラミング、宣言的プログラミング、関数型プログラミングなど、さまざまなプログラミングパラダイムに対応しています。ユーザーは自分のニーズに最適なプログラミングスタイルを選択できます。

## パッケージのアーキテクチャ

`ts-graphviz` は複数のパッケージで構成されています：

| パッケージ                                                                       | バージョン                                                                                                      | 概要                                         | 説明                                                                                                                                                           |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [ts-graphviz](https://www.npmjs.com/package/ts-graphviz)                       | [![npm](https://img.shields.io/npm/v/ts-graphviz)](https://www.npmjs.com/package/ts-graphviz)                 | TypeScript 用の Graphviz ライブラリ           | メインパッケージであり、エントリーポイントとして機能します。Graphviz DOT 言語のグラフを作成、操作、レンダリングするための高レベル API を提供します。          |
| [@ts-graphviz/common](https://www.npmjs.com/package/@ts-graphviz/common)       | [![npm](https://img.shields.io/npm/v/@ts-graphviz/common)](https://www.npmjs.com/package/@ts-graphviz/common) | Graphviz の型とユーティリティ                 | DOT 言語の属性、属性値、モデルに関連する型情報を含んでいます。                                                                                                  |
| [@ts-graphviz/ast](https://www.npmjs.com/package/@ts-graphviz/ast)             | [![npm](https://img.shields.io/npm/v/@ts-graphviz/ast)](https://www.npmjs.com/package/@ts-graphviz/ast)       | Graphviz AST ユーティリティ                  | 抽象構文木（AST）レベルで DOT 言語を処理するためのモジュールを含んでいます。                                                                                   |
| [@ts-graphviz/core](https://www.npmjs.com/package/@ts-graphviz/core)           | [![npm](https://img.shields.io/npm/v/@ts-graphviz/core)](https://www.npmjs.com/package/@ts-graphviz/core)     | オブジェクト指向プログラミング用の Graphviz モデル | ユーザーに提供されるモデルと関数の実装を含んでいます。                                                                                                        |
| [@ts-graphviz/adapter](https://www.npmjs.com/package/@ts-graphviz/adapter)     | [![npm](https://img.shields.io/npm/v/@ts-graphviz/adapter)](https://www.npmjs.com/package/@ts-graphviz/adapter) | クロスプラットフォーム対応の Graphviz ランタイムアダプター | 入出力処理や異なる環境でのレンダラーの実装など、ランタイム依存の処理を扱います。                                                                               |

これらのパッケージは連携するように設計されており、必要な機能を選択して使用できます。
