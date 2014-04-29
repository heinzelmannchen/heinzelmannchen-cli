heinzelmannchen-cli
===================

Usage
-----

The main functions of heinzelmannchen are:
```shell
heinzel help
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
