export type DeviceCodeResponse = {
  device_code: string
  user_code: string
  expires_in: number
  interval: number
  verification_uri: string
  verification_uri_complete: string
}

export type TokenResponse = {
  access_token: string
  refresh_token: string
  id_token: string
  token_type: string
  expires_in: number
}