// Copyright (c) 2022 Evolving Software Corporation
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Head from 'next/head'
import { useState, useEffect } from 'react';
import grapesjs from 'grapesjs'
import gjsPresetWebpage from 'grapesjs-preset-webpage'

export default function PageEditor() {
  const [editor, setEditor] = useState(null)
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      plugins: ['gjs-preset-webpage'],
      pluginsOpts: {
        gjsPresetWebpage: {
        
        }
      }
    })
    setEditor(editor)
  }, [])



  return (
    <div>
     
      <div className="App">
        <div id="gjs"></div>
      </div>

    </div>
  )
}
