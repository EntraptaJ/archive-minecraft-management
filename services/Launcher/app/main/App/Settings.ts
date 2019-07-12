// Launcher/app/main/App/Settings.ts
import { outputJSON, readJSON, pathExists, pathExistsSync, readJSONSync } from 'fs-extra'

export interface AppConfig {
  /**
   * The MC Management Server URL
   */
  serverURL: string
  ramAllocation: number
}

const configPath = `${process.resourcesPath}/config.json`

export const loadConfig = async (): Promise<AppConfig> => {
  const configExists = await pathExists(configPath)
  if (!configExists) return { serverURL: 'https://mc.kristianjones.dev', ramAllocation: 5 }
  else return readJSON(configPath)
}

export const loadConfigSync = (): AppConfig => {
  const configExists = pathExistsSync(configPath)
  if (!configExists) return { serverURL: 'https://mc.kristianjones.dev', ramAllocation: 5 }
  else return readJSONSync(configPath)
}

export const saveConfig = async (config: AppConfig) => outputJSON(configPath, config)