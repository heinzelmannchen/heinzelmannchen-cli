heinzelmannchen-cli
===================

![logo](https://raw.githubusercontent.com/heinzelmannchen/heinzelmannchen/master/Heinzelmannchen.png)

Heinzelmannchen is a little helper for your daily work. It is used to create code from your templates and a datasource (i.e. a database).
You have full control over the templates you'd like to use for your projects.
This is the cli for the [heinzelmannchen](https://github.com/heinzelmannchen/heinzelmannchen) codegeneration tool.

Usage
-----

### Systemrequirements

* Nodejs installed (http://nodejs.org)

### Installation
```shell
$ npm install heinzelmannchen-cli --global
```

### How to use the CLI

Once installed you can use `heinzel` in the terminal.

```shell
$ heinzel [commando] --help
```

#### I need some help
Just enter `--help`.

```shell
$ heinzel --help
$ heinzel create --help
```

### How to use Heinzelmännchen in a project

Heinzelmännchen needs a `.heinzelrc` file to know what you want to do. You can easily create one,
by running the `init` command. The `.heinzelrc` contains domains, which define a template and a datasource for creation.
If you want to use your own template for your `.heinzelrc` file checkout (creating your own .heinzelrc.tpl).

### Creating a template

To get going you need some templates. Templates can be writen in ERB-Style or you can set your own delimiters in the `.heinzelrc`.
Heinzelmännchen uses [underscore](underscorejs.org/#template) to process the templates. So you can use the hole functionality from underscore, and additionaly the functionality from [underscore.string](https://github.com/edtsech/underscore.string).
Placeholders with a `=` will be evaluated by underscore,
```
Hallo <%= name %> // if name = 'Anton' -> Hallo Anton
```

without a `=` it will be interpolated.

```
<% var age = 109 %>
You are <%= age %> // -> You are 109
```

### Defining your domains
A domain is defines a template and a generator which creates data for processing the template.
Domains are defined in the `.heinzelrc` file and can be grouped for easier creation.

The `.heinzelrc` file contains an object `domains` which contains domainsdefinitions.

```json
{
    "domains": {
        "express": {
            "routes": {
                "template": "route.js.tpl",
                "output": "./backend/routes/<%= name %>.js"
            },
            "appjs": {
                "template": "app.js.tpl",
                "output": "./backend/app.js"
            }
        },
        "angular": {
            // angular templates...
        }
    }    
}
```

NEEDS TRANSLATION
=================
1.8	Verwendung von Generatoren
Es können beliebig viele Generatoren in einem Projekt verwendet werden. Heinzelmännchen bietet die Möglichkeit die NPM-Registry nach einem bestimmten Generator zu durchsuchen.
$ heinzel search pg
┌────────────┬───────────────────────────────────────────────────────────────────────┐
│ generators │ ┌────────────────────────┬──────────────────────────────────────────┐ │
│            │ │ Name                   │ Description                              │ │
│            │ ├────────────────────────┼──────────────────────────────────────────┤ │
│            │ │ heinzelmannchen-gen-pg │ PostGresql generator for heinzelmannchen │ │
│            │ └────────────────────────┴──────────────────────────────────────────┘ │
├────────────┼───────────────────────────────────────────────────────────────────────┤
│ templates  │ nothing found                                                         │
└────────────┴───────────────────────────────────────────────────────────────────────┘

Es können mehrere Schlüsselwörter angegeben werden nach denen gesucht wird.
Ein Generator kann nun via Heinzelmännchen installiert werden. Die Installation eines Generators führt dazu, dass ein Nodejs Modul im aktuellen Verzeichnis unter node_modules installiert wird und ein Eintrag in der .heinzelrc-Datei erfasst wird.
$ heinzel install –-gen pg	
Um ein Template zu erstellen ist es wichtig, dass man die Datenstruktur, die durch einen Generator erzeugt wird, kennt. Man kann sich diese Datenstruktur anzeigen lassen, indem man das Kommando explain verwendet.
$ heinzel explain pg
info:    [{
        table_name: "a-table-name",
        table_schema: "public",
        columns: [{
                column_name: "column_name",
                data_type: "int|string|...",
                column_default: "Foo",
                is_nullable: true,
                character_maximum_length: 7,
                numeric_precision. 3
        } ...]
} ...]
1.9	Eigenen Generator erstellen
Um einen eigenen Generator zu erstellen kann Heinzelmännchen verwendet werden um das Grundgerüst des Generators zu generieren. Dazu muss Heinzelmannchen global installiert sein .
1.	Erstellen eines Ordners und wechseln in diesen.
$ mkdir myGenerator
$ cd myGenerator
2.	Erzeugen eines .heinzelrc 
❯ $ heinzel init generator.tpl
3.	Erstellen aller Domains.
❯ $) heinzel create all --override --ensureDirExists 
4.	Nun ist die Grundstruktur eines Generators erstellt.
❯ $) ls -la
total 8
.gitignore
.heinzelrc
README.md
index.js
node_modules
package.json
test
5.	Als letzter Schritt müssen die abhängigen Nodejs Module installiert werden.
❯ $ npm install
6.	Nun kann die Funktionalität des Generators in der Datei index.js implementiert werden.
Usage
-----

The main functions of heinzelmannchen are:
```shell
heinzel
heinzel [command] --help
heinzel explain
heinzel create
heinzel list
heinzel search
heinzel install
heinzel uninstall
heinzel update
heinzel init
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

### search

Search for templates or generators on NPM.

### install

Install templates or generators on NPM.

### uninstall

Uninstall templates or generators from your project.

All functions can be used programmaticaly by using [heinzelmannchen](https://github.com/heinzelmannchen/heinzelmannchen).
