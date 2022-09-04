import Head from 'next/head'
import { useState, useEffect } from 'react';
import grapesjs from 'grapesjs'
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import Link from 'next/link';

export default function Home() {
  const [editor, setEditor] = useState(null)
  const [pageName, setPageName] = useState('')
  const [pages, setPages] = useState([])
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
  // fetch the data from the server and set the state
  useEffect(() => {
    fetch('http://localhost:5000/pages')
      .then(res => res.json())

      .then(data => {
        console.log(data)
        setPages(data)
      })
  }, [])

  console.log(pages)
  const submitForm = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    const formData = new FormData(e.target)
    const formDataObj = {}
    for (let [key, value] of formData.entries()) {
      formDataObj[key] = value
    }

    fetch('http://localhost:5000/pages/', {
      method: 'POST',
      body: JSON.stringify(formDataObj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Something went wrong')
        }
      }
      )
      .then(res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      })
    // update the page name with the value of the formDataObj
    setPageName(formDataObj.title)

    // send the formDataObj to the server

    // update the pages array with the new page from the server
 
  }


  return (
    <div>

      <div className="title">Evolving CMS Page Builder</div>
      <div className="subtitle">Your pages are displayed below.</div>
      {/* a small form to get the name of the page to be created */}
      <div className="form-container">
        <form onSubmit={submitForm} >
          <label>
            Page Name:
            <input type="text" name="title" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <Link href={`/editor/${pageName}`}>
        <a className="button">Click here to create a new page</a>
      </Link>
      {/* a list of pages in a table with the details in each space */}

      <table className="table">
        <thead>
          {pages[0] ? <tr>
            <th>Page Name</th>
            <th>Page ID</th>
            <th>Page SLUG</th>
          </tr> :
            // if there are no pages, display a message
            <tr>
              <th>No Pages</th>
            </tr>
          }
        </thead>
        <tbody>
          {pages ? pages.map(page => (
            <tr key={page.id}>
              <td>{page.name}</td>
              <td>{page.id}</td>
              <td>{page.slug}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  )
}
