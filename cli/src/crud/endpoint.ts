import type { Schema } from './types.ts'

export type Endpoint = {
  path: string
  properties: Schema
}

export type Endpoints = {
  [alias: string]: Endpoint
}

export type EndpointGroups = {
  [alias: string]: Endpoints
}