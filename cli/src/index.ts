import minimist from 'minimist'
import { HELP_PARENT_MESSAGE } from './messages.ts'
import { loadEndpoints } from './crud/index.ts'

function main() {
  const params = minimist(process.argv.slice(2))
  console.log(JSON.stringify(params))
  const commands = params._
  if (commands.length === 0) {
    console.log(HELP_PARENT_MESSAGE)
    return
  }

  const endpoints = loadEndpoints()

  if (commands.at(-1) === 'help') {
    if (commands.length >= 2) {
      const requestedAlias = commands.at(0)
      if (requestedAlias) {
        const endpoint = endpoints[requestedAlias]
        if (endpoint) {
          if (commands.length >= 3) {
            const subcommand = commands.at(1)
            if (subcommand) {
              const requestedSubcommand = endpoint[subcommand]
              if (requestedSubcommand) {
                // print subcommand parameters
                return
              }
            }

          }
          // print subcommands
          return
        }
      }
    }
    // print all endpoints
    return
  }


}


main()