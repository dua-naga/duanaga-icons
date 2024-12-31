import { useFetch } from '@vueuse/core'

const URL = 'https://raw.githubusercontent.com/marella/material-symbols/main/metadata/versions.json'

class Icon {
  public async getNames() {
    try {
      const { data } = await useFetch(URL)

      if (!data.value) {
        throw new Error('Icon metadata not found')
      }

      return Object.keys(JSON.parse(data.value as string))
    } catch (error: any) {
      console.error('Error getting icon metadata:', error.message)
    }
  }
}

export default new Icon()
