# Starter 项目

这是一个集成了多个开发工具的starter项目,旨在提供一个良好的开发环境和代码质量保证。

## 集成工具

本项目集成了以下工具:

- Husky: Git钩子工具,用于在提交代码前自动运行脚本(如lint检查、测试等)。
- ESLint: 用于静态代码分析,发现并修复JavaScript/TypeScript代码中的问题。
- Prettier: 代码格式化工具,确保代码风格的一致性。
- Commitlint: 用于检查Git提交信息是否符合约定式提交规范。
- Vitest: 快速的单元测试框架,兼容Jest的API。

## 使用说明

1. 克隆此仓库
2. 安装依赖: `pnpm install`
3. 运行测试: `pnpm test`
4. 运行lint检查: `pnpm run lint`
5. 格式化代码: `pnpm run format`

## 提交代码

请确保您的提交信息符合[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)规范。

## 许可证

[MIT](LICENSE)
