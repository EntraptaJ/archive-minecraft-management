// Launcher/app/main/App/Settings.ts
import { outputJSON, readJSON, pathExists } from 'fs-extra'

interface AppConfig {
  /**
   * The MC Management Server URL
   */
  serverURL: string
}

const configPath = `${process.resourcesPath}/config.json`

export const loadConfig = async (): Promise<AppConfig> => {
  const configExists = await pathExists(configPath)
  if (!configExists) return { serverURL: 'https://mc.kristianjones.dev' }
  else return readJSON(configPath)
}

export const saveConfig = async (config: AppConfig) => outputJSON(configPath, config)