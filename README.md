# Labs Basic Node API Generator

The Labs API generator will create a [basic node express app](https://docs.labs.lambdaschool.com/api/)
with configuration and elements in place based on answers to the prompts/
options. Common elements found in all configurations are:

- Labs opinionated project structure
- example routes
- Working tests for route end points using jest and mocks
- Labs defined eslint and pretter config
- github ci/actions workflow config

## CLI Examples

Create an API app for the labs 27 gigantic product and answer prompts

`labs api labs27-gigantic`

Create an API app for the Labs 26 gigantic product with the `labs` program
option.

`labs spa labs26-gigantic --program-name=labs`

When only the project name argument is provided then you will be prompted
for more info.

![Labs API prompts](api-prompts.png)

``` bash
Usage:
  yo api:app <name> [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers                       Default: false
        --skip-install   # Do not automatically install dependencies            Default: false
        --force-install  # Fail on install dependencies error                   Default: false
        --ask-answered   # Show prompts for already configured options          Default: false
  -p,   --program        # Which program will this be used for: "bw" or "labs"
  -d,   --hasDS          # project has DS team members

Arguments:
  name  # Name of Project  Type: String  Required: true
```

## Prompts / Options

The following prompts will provide additional configuration and examples

### Does your team have Data Science members

#### Option

`--hasDS` or `-d` - passing `false` to the option will turn it off.

#### Prompt

If the answer is `Y` then the following items will be added to the project:

- modules `plotly.js` and `react-plotly.js`
- an example data visualization page component `ExampleDataViz` using a DS API.

### Program

#### Option

`--program` or `-p` - pass `labs` or `bw`

#### Prompt

The program choices are `BW` and `Labs`

- `BW` will generate the base configuration.
- `Labs` will add the following elements
  - Okta identity management service
  - Secure routes using Okta library
  - Secure BE API example using Okta JWT
  - [Ant Design](https://docs.labs.lambdaschool.com/labs-spa-starter/styling-with-ant-design) configuration and theme
  - [Storybook](https://docs.labs.lambdaschool.com/labs-spa-starter/storybook) documentation
  - [AWS Amplify](https://docs.labs.lambdaschool.com/labs-spa-starter/untitled) config file

## Enter your Github repo HTTPS git url

#### Option

`--repoUrl` or `-r` - leave empty (`-r`) to turn off

#### Prompt

This is the git https url (eg https://github.com/Lambda-School-Labs/gen-test-git.git)

When this value is provided then the generator will do the following:

- init the git repo with this URL as the remote
- create a main branch
- stage and commit the generated files
- push the branch to github
