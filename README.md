heinzelmannchen-cli
===================

Usage
-----

The main functions of heinzelmannchen are:
```shell
heinzel help
heinzel explain
heinzel create
heinzel list
heinzel add
heinzel search
heinzel install
heinzel uninstall
```

All functions share the same subset of options:
```shell
--generator, -G
--template, -T
--output, -O
--delimiter, -L
--config, -C
--silent, -S
--debug, -D
```

### Create

`heinzel create` is the main function of heinzelmannchen.
It reads the config (`.heinzelrc`) and creates code for a given domain.

It takes a domain or a path to a domain as it's first argument.

```shell
heinzel create [domain] # one or more domains
```

### list
`heinzel list` is used to display available templates, generators and domains.
You can list template by adding the `--template` flag. The same can be done for generators and templates.

### add
`heinzel add`is used to add domains to the `.heinzelrc`.
It

### search
### install
### uninstall

Architecture
------------

Heinzelmannchen-cli uses [commander.js](https://github.com/visionmedia/commander.js) and [commander-tabtab.js](https://github.com/bencevans/commander-tabtab.js)
for argv parsing.

All functions can be used programmaticaly by using [heinzelmannchen](https://github.com/heinzelmannchen/heinzelmannchen).
