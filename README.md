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

### Setting up Heinzelmännchen

Heinzelmännchen needs a `.heinzelrc` file to know what you want to do. You can easily create one,
by running the `init` command. Or just run:

```shell
$ cd to/your/project
$ touch .heinzelrc
```

The `.heinzelrc` contains domains, which define a template and a datasource from a generator for creation.
If you want to use your own template for your `.heinzelrc` file checkout (creating your own .heinzelrc.tpl).

#### Domains
A domain is defines a template and a generator which creates data for processing the template.
Domains are defined in the `.heinzelrc` file and can be grouped for easier creation.

The `.heinzelrc` file contains an object `domains` which contains domainsdefinitions.

```json
{
    "domains": {
        "express": {
            "routes": {
                "template": "express/route.js.tpl",
                "output": "./backend/routes/<%= name %>.js"
            },
            "appjs": {
                "template": "express/app.js.tpl",
                "output": "./backend/app.js"
            }
        },
        "angular": {
            // angular templates...
        }
    }    
}
```

#### Templates

You can use templates from a repository or a folder on your system. If you want to use templates from a repository 
you need to specify there location in the `.heinzelrc`.

```json
{
    /// ..domains
    "templates": {
        "express": "git+https://github.com/USER/heinzelmannchen-tpl-express.git#1.0.1",
        "angular": "git+http://yourrepo.com/heinzelmannchen-tpl-angular.git#1.0.1"
    }
}
```

You can reference the templates in the templaterepo by the name defined name.
If you want to maintain the templates in a folder you can directly reference them in a domain.

```json
{
    "domains": {
        "appjs": {
            "template": "express/app.js.tpl"
        },
        "anotherdomain": {
            "template": "/Users/Anton/mytemplates/foo.tpl"
        }
    }
    // ..templates
}
```

##### Creating a template

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

### Generators

Finally your templates need some data. Heinzelmännchen uses generators, which create data from a source.
You can create your own data if you don't find one in the npm reqistry (check out [how to create a generator](https://github.com/heinzelmannchen/heinzelmannchen-generator)).

```shell
$ heinzel search -g keyword
```

To install a generator you can run `install` in the terminal.

```shell
$ heinzel install -g ask
```

This will install [heinzelmannchen-gen-ask](https://www.npmjs.org/package/heinzelmannchen-gen-ask) in the nearest node_packages folder
and add it to the `.heinzelrc` file.

To checkout what a generator does or what datastructur it returns run the following commands in your terminal.

```shell
$ heinzel explain ask
```

TODO
====
* how to use ask for a start
