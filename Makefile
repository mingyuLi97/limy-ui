default: help

new:
	node scripts/new.js

reinstall:
	rm -rf yarn.lock node_modules/ && lerna clean -y && yarn

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake new\033[0m\t\t---  创建新组件 (mini-card)"
	@echo "   \033[35mmake reinstall\033[0m\t---  重新安装依赖"
