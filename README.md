heinzelmannchen-cli
===================

![logo](https://raw.githubusercontent.com/heinzelmannchen/heinzelmannchen/master/Heinzelmannchen.png)

Heinzelmannchen is a little helper for your daily work. It is used to create code from your templates.
This module acts as a facade for the underlying heinzelmannchen functionality, exposing an easy to use promise based API.
This is the cli for the [heinzelmannchen](https://github.com/heinzelmannchen/heinzelmannchen) codegeneration tool.

Usage
-----

### Systemrequirements

* Nodejs installed (http://nodejs.org)

### Installation
```shell
$ npm install heinzelmannchen-cli --global
```

1.3	Installation für Programmierer
1.	Nodejs installieren (siehe http://nodejs.org)
2.	Unter Windows: einen git Client installieren, z.B.: http://msysgit.github.io
3.	Repositories klonen:
$ git clone https://github.com/heinzelmannchen/heinzelmannchen-generator.git
$ git clone https://github.com/heinzelmannchen/heinzelmannchen-tpl-default-config.git
$ git clone https://github.com/heinzelmannchen/heinzelmannchen.git
$ git clone https://github.com/heinzelmannchen/heinzelmannchen-cli.git
$ git clone https://github.com/heinzelmannchen/heinzelmannchen-template.git
$ git clone https://github.com/heinzelmannchen/heinzelmannchen-gen-pg.git
$ git clone https://github.com/heinzelmannchen/heinzelmannchen-datatypes.git
$ git clone https://github.com/heinzelmannchen/pg2json.git
$ git clone https://github.com/heinzelmannchen/heinzelmannchen-gen-ask.git
$ git clone https://github.com/heinzelmannchen/heinzelmannchen-npm.git
$ git clone https://github.com/heinzelmannchen/heinzelmannchen-config.git
$git clone https://github.com/heinzelmannchen/heinzelmannchen-fs.git
4.	Danach müssen die Abhängigkeiten in den entsprechenden Ordnern installiert werden.
$ cd [project-name]
$ npm install
5.	Falls an pg2json oder heinzelmannchen-gen-pg gearbeitet wird:
PostgreSQL installieren (http://www.postgresql.org)
6.	Um die Integrationstests ausführen zu können muss die Datenbank noch erstellt werden. 
$ cd heinzelmannchen-gen-pg/
$ npm run-script create-integration-db

1.4	Anwendung des CLI-Tools
Das CLI-Tool ist ein eigenständiges Nodejs-Modul. Es kann über die NPM-Registry installiert werden.
$ [sudo] npm install heinzelmannchen-cli --global

Danach kann auf der Kommandozeile das Tool via heinzel ausgeführt werden.
Das Tool bietet eine Hilfe für alle Kommandos. Die Hilfe kann mit dem Flag --help aufgerufen werden.
$ heinzel [commando] --help

$ heinzel --help
  Usage: heinzel [options] [command]

  Commands:

    create [options] <domain> [filters] create domains
    init [template] [ask] [repo] initialize the .heinzelrc
    ii [template] [ask] [repo] an alias for init [template] [ask] [repo]
    list [options]         list domains, templates and generators
    ls [options]           an alias for list
    explain <generator>    explain datastructure returned by generator
    ex <generator>         an alias for explain <generator>
    install [options]      install templates and generators
    in [options]           an alias for install
    uninstall [options]    uninstall templates and generators
    un [options]      	

$ heinzel create --help
  Usage: create [options] <domain>,[filters]

  Options:
    -h, --help             output usage information
    -o, --override         override existing files
    -d, --ensureDirExists  ensure dir exists
    -y, --dryRun           dry run, heinzel doesn't create files
Die Hilfe wird ausserdem angezeigt, wenn ein Benutzer ein Kommando eingibt, welches nicht unterstützt wird.

1.5	Verwendung in einem Projekt
Um in einem Projekt Heinzelmännchen zu verwenden muss eine Konfigurationsdatei erstellt werden. Dies kann mit dem Init Kommando automatisiert werden.
$ heinzel init
Dieses Kommando erzeugt anhand eines Templates ein „.heinzelrc“-File. Wenn das Kommando ohne weitere Parameter aufgerufen wird, wird die Standard Konfiguration von Heinzelmännchen verwendet. Es kann jedoch ein eigenes Template für die Erstellung der Konfigurationsdatei verwendet werden. Dieses Template wird mit Daten, die durch den Generator heinzelmannchen-gen-ask erzeugt werden, aufgerufen. Da noch keine Konfiguration für den Generator besteht, muss dem Konfigurationstemplate eine JSON-Datei beiliegen, welche definiert, welche Daten das Template für die Kompilierung benötigt. 
$ heinzel init heinzelrc.tpl heinzelrc.json myRepo
Heinzelmännchen kennt bereits eine zweite Standard Konfiguration, nämlich für die Erstellung eines Generators .
1.6	Erstellen eines Templates
Templates werden normalerweise in der ERB -Syntax geschrieben. Es gibt zwei Arten, wie ein Platzhalter kompiliert wird. Einerseits gibt es die Evaluierung eines Platzhalters, andererseits gibt es die Interpolation eines Platzhalters. Die Interpolation eines Platzhalters sieht wie folgt aus.
Hallo <%= name %>
Listing 25: Template Platzhalter für Interpolation
Wenn die Variable name den Wert „Anton“ hat dann wird der Platzhalter Interpoliert und ergibt den String: 

Hallo Anton

Ein Platzhalter für die Evaluierung sieht wie folgt aus.
<% var counter = 10 %>
Listing 26: Template Platzhalter Evaluation
Dieser Platzhalter wird vom JavaScript Interpreter evaluiert. Es kann der komplette Funktionsumfang von JavaScript, Underscore.js und der Erweiterung Underscore.string verwendet werden.
Ein Template kann Kontrollstrukturen enthalten um einen Teil des Templates zu wiederholen.
<ul>
    <% _.each(heinzels, function(heinzel) { %>
    <li>
        <%= heinzel %>
    </li>
    <% } %>
</ul>
Listing 27: Template mit Kontrollstruktur
Wenn heinzels eine Array mit den Werten „Anton“ und „Berti“ ist, dann kompiliert das Template zu:
<ul>
    <li>
        Anton
    </li>
    <li>
        Berti
    </li>
</ul>
Listing 28: Output Template
Templates können in einem eigenen Repository oder in einem Ordner gespeichert werden und in einem „.heinzelrc“ referenziert werden. Falls ein Template andere Delimiters verwendet (z.B. Mustache-Style {{ }}), kann dies in der Domain definiert werden .
Falls Templates in einem eigenen Repository gespeichert werden, muss ein „package.json“ erstellt werden. Dies ermöglicht es eine bestimmte Version eines Templates in einem Projekt zu erstellen. Ein „package.json“ kann mittels npm init erstellt werden.
1.7	Erstellen einer Domain
Eine Domain kann in der Konfiguration von Heinzelmännchen im „.heinzelrc“ erfasst werden. In der Konfiguration werden alle Domains im Objekt domains erfasst. Eine Domain muss entweder weitere Domains enthalten oder ein Attribute template beinhalten.
{
    "domains": {
        "domain_A": {
            "domain_Aa": {
                "template": "myTemplate"
            }
        },
        "domain_B": {
            "template": "otherTemplate"
        }
    }    
}
Listing 29: .heinzelrc Domains
Eine Domain benötigt immer ein Template, Daten für das Template und einen Output Pfad. Diese Konfigurationen müssen aber nicht für jede Domainstufe deklariert werden, sie können vererbt werden. Im folgenden Beispiel wird der Outputpfad auf den jeweiligen Domains definiert, der Generator wird jedoch für alle Domains nur einmal definiert.
{
    "domains": {
        "domain_A": {
            "domain_Aa": {
                "template": "myTemplate",
                "output": "./dir/<%= name %>.md"
            }
        },
        "domain_B": {
            "template": "otherTemplate" ,
            "output": "./dir/foo.bar",
	     "delimiter": "{{ }}"
        },
        "generator": "pg"
    }
}
Listing 30: heinzelrc Domains mit Vererbung
Wie im Beispiel oben ersichtlich ist, kann ein Outputpfad aus Templateplatzhaltern bestehen. So können also Variablen aus dem Generator  verwendet werden.
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
