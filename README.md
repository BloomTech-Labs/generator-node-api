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

![Labs API prompts](spa-prompts.png)


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