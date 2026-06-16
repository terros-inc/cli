import minimist from 'minimist'
import {
  formatCommandsHelp,
  formatSubcommandParametersHelp,
  formatSubcommandsHelp,
  HELP_PARENT_MESSAGE,
} from './messages.ts'
import { loadEndpoints } from './crud/index.ts'

function main() {
  const params = minimist(process.argv.slice(2))
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
                console.log(formatSubcommandParametersHelp(
                  requestedAlias,
                  subcommand,
                  requestedSubcommand.parameters,
                ))
                return
              }
            }

          }
          const subcommands = Object.keys(endpoint).sort()
          console.log(formatSubcommandsHelp(requestedAlias, subcommands))
          return
        }
      }
    }
    const endpointList = Object.keys(endpoints).sort()
    console.log(formatCommandsHelp(endpointList))
    return
  }


}


main()
