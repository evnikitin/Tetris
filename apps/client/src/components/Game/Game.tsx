import React from 'react'
import { Play } from './Play/Play'
import { UserSettings } from '../../hooks/useSettings'

interface GameProps {
  settings: UserSettings
}

export const Game = ( {settings} : GameProps) => {
  return (
    <Play settings={settings} rows={10} columns={8} />
  )
}