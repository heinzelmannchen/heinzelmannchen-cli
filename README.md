heinzelmannchen-cli
===================

This is the cli for the [heinzelmannchen](https://github.com/heinzelmannchen/heinzelmannchen) codegeneration tool.

Usage
-----

The main functions of heinzelmannchen are:
```shell
heinzel [command] --help
heinzel explain
heinzel create
heinzel list
heinzel add
heinzel search
heinzel install
heinzel uninstall
heinzel update
```

### help

Don't panic! Use the buildin help

### explain

Explains the data a generator returns.

### create

`heinzel create` is the main function of heinzelmannchen.
It reads the config (`.heinzelrc`) and creates code for a given domain.

It takes a domain or a path to a domain as it's first argument.

```shell
heinzel create <domain> [filters] # one or more domains
```

#### filters

You can pass multiple filters to heinzel.
They follow the following pattern:
`key=value[,value][,key=value[,value]]`

### list
`heinzel list` is used to display available templates, generators and domains.
You can list template by adding the `--templates` flag. The same can be done for generators and templates.

### add
`heinzel add`is used to add domains to the `.heinzelrc`.
It

### search

Search for templates or generators on NPM.

### install

Install templates or generators on NPM.

### uninstall

Uninstall templates or generators from your project.

Architecture
------------

Heinzelmannchen-cli uses [commander.js](https://github.com/visionmedia/commander.js) and [commander-tabtab.js](https://github.com/bencevans/commander-tabtab.js)
for argv parsing.

All functions can be used programmaticaly by using [heinzelmannchen](https://github.com/heinzelmannchen/heinzelmannchen).
