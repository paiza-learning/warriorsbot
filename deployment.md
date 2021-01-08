# Deployment

> 本番サーバーに warriorsbot の変更を反映する

## 1. ローカルの develop ブランチを最新に取り込む

develop ブランチに取り込まれた変更をリリースします。

```
# 現在のブランチが develop ブランチであることを確認する
$ git branch --show-current
develop

# develop ではなかった場合 develop へ切り替える
$ git switch develop

# develop ブランチを最新に追従する
$ git pull
```

## 1. バージョンを決定する

warriorsbot では[セマンティックバージョニング](https://semver.org/lang/ja/)を採用しています。

### 例: v1.2.3

バージョンは `v(メジャーバージョン).（マイナーバージョン）.（パッチバージョン）` で決定します。

| 区分               | バージョンを上げるタイミング |
| ------------------ | ---------------------------- |
| メジャーバージョン | 互換のない機能追加・変更など |
| マイナーバージョン | 互換のある機能追加・変更など |
| パッチバージョン   | バグ修正時など               |

**バージョンをさげることはありません。**

なお、メジャーを上げた場合にはマイナーとパッチを、マイナーを上げた場合にはパッチを 0 にリセットします。

## 2. release ブランチを切る

develop から派生して `release/v0.0.0` の形式でバージョンを明示したブランチを作成します。

```
# バージョン番号は例
$ git switch -c release/v0.0.0
```

## 3. package.json のバージョンを上げる

`package.json` の `version` の項目を対象のバージョンに変更します。  
ただし、先頭の `v` は不要です。

```json
{
  "name": "warriorsbot",
  "version": "0.0.0"
  // ......
}
```

変更後、`release: v0.0.0` などのコメントでコミットして push します。

```
$ git commit -am "release: v0.0.0"
$ git push origin HEAD
```

## 4. release ブランチから develop ブランチ向けに PR を出す

リリース作業であることを明示して PR を出します。

## 5. PR が develop ブランチにマージされたら master ブランチへマージして tag を切る

```
# 現在のブランチが develop ブランチであることを確認する
$ git branch --show-current
develop

# develop ではなかった場合 develop へ切り替える
$ git switch develop

# develop ブランチを最新に追従する
$ git pull

# master ブランチへ切り替える
$ git switch master

# master ブランチを最新に追従する
$ git pull

# develop ブランチをマージする
$ git merge develop

# バージョン名の tag を切る
$ git tag v0.0.0
```

## 6. master ブランチと tag を push する

master ブランチへ push すると自動で heroku へのデプロイが開始されます。

```
$ git push origin master
$ git push origin v0.0.0
```

## 7. リリースログを書く

github 上で 「Releases」 => 「Create a new release」で該当バージョンの変更内容を記述する。

