## 项目公共包（`Monorepo`仓库）

### 构建与发布

#### 安装依赖
``` cmd
pnpm install -w  //安装根目录所有项目公共依赖

pnpm install -r  //安装根目录所有项目公共依赖

pnpm install --filter=ud-utils //安装指定子项目项目依赖
```

#### 打包

``` cmd
pnpm --filter=ud-utils run build //指定子项目打包
```

#### 发布到私有npm

``` cmd
pnpm publish --filter=ud-utils //指定子项目发布到npm
```

### `ud-components`

> 公共组件

### `ud-utils`

> 公共工具方法