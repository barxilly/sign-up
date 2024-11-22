import { ActionIcon, Badge, Button, Card, Center, Checkbox, FileInput, Image, Loader, MantineProvider, NumberInput, PinInput, Popover, Select, Stack, Text, Textarea, TextInput, Tooltip } from '@mantine/core'
import '@mantine/core/styles.css'
import './App.css'
import { useState } from 'react'
// import { NodeJS } from 'node' // Removed unnecessary import
import { FaAppleAlt } from 'react-icons/fa'
import { ImImage } from 'react-icons/im'
import { BiBot } from 'react-icons/bi'

function App() {
  function htmlSelect(id: string) {
    const e = document.querySelector(id)
    return e as HTMLElement
  }

  function encrypt(text: string) {
    // Caeser Cipher by 4
    let res = text.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 4)).join('')
    // Add 5 random characters
    for (let i = 0; i < 5; i++) {
      res += String.fromCharCode(Math.floor(Math.random() * 25) + 97)
    }
    return res
  }

  function decrypt(text: string) {
    return (text.slice(0, -5)).split('').map(c => String.fromCharCode(c.charCodeAt(0) - 4)).join('')
  }

  function htmlInput(id: string) {
    const e = document.querySelector(id)
    return e as HTMLInputElement
  }

  const cs = ['#initial', '#fruit', '#code', '#tocs', '#tocs2', '#dubs', '#dubs2', '#optins', '#pfp', '#thanks']

  let current = 0

  function nextPage() {
    if (localStorage.getItem('c')) current = Number(localStorage.getItem('c') as unknown as string);
    console.log(current)

    if (current >= cs.length - 1) {
      current -= 1
    }
    current += 1
    console.log("is now", current)
    cs.forEach(e => htmlSelect(e).style.display = 'none')
    htmlSelect('#loading').style.display = 'block'
    setTimeout(() => {
      htmlSelect('#loading').style.display = 'none'
      htmlSelect(cs[current]).style.display = 'block'
    }, Math.random() * 1000 + 1000)
    localStorage.setItem('c', (current).toString())
    if (localStorage.getItem('t1')) setTosv(decrypt(localStorage.getItem('t1')!))
    if (localStorage.getItem('d1')) {
      const d = decrypt(localStorage.getItem('d1') as string) as unknown as number
      if (d === 0) {
        htmlSelect('#dubsRA').innerHTML = 'Bankrupt'
        localStorage.setItem('rt', 'Bankrupt')
      } else if (d < 250) {
        htmlSelect('#dubsRA').innerHTML = 'Cheapskate'
        localStorage.setItem('rt', 'Cheapskate')
      } else if (d < 500) {
        htmlSelect('#dubsRA').innerHTML = 'Dull'
        localStorage.setItem('rt', 'Dull')
      } else if (d < 1000) {
        htmlSelect('#dubsRA').innerHTML = 'Big Spender'
        localStorage.setItem('rt', 'Big Spender')
      } else if (d < 2000) {
        setInterval(() => {
          const sy = ['£', '$', '#', '?', '&', '%', '@']
          htmlSelect('#dubsRA').innerHTML = 'Bougouise B' + sy[Math.floor(Math.random() * sy.length)] + sy[Math.floor(Math.random() * sy.length)] + sy[Math.floor(Math.random() * sy.length)] + sy[Math.floor(Math.random() * sy.length)]
          localStorage.setItem('rt', 'Bougouise B' + sy[Math.floor(Math.random() * sy.length)] + sy[Math.floor(Math.random() * sy.length)] + sy[Math.floor(Math.random() * sy.length)] + sy[Math.floor(Math.random() * sy.length)])
        }, 500)
      } else if (d < 9999) {
        htmlSelect('#dubsRA').innerHTML = 'Get-Away-With-Murder Rich'
        localStorage.setItem('rt', 'Get-Away-With-Murder Rich')
      }
    }
    if (localStorage.getItem('pfp')) {
      const pfp = decrypt(localStorage.getItem('pfp') as string)
      console.log(pfp);
      (htmlSelect('#pfpimg') as HTMLImageElement).src = pfp;
      console.log((htmlSelect('#pfpimg') as HTMLImageElement));

      const pun = decrypt(localStorage.getItem('u1') as unknown as string)
      htmlSelect('#pun').innerHTML = pun

      const prt = localStorage.getItem('rt') as unknown as string
      htmlSelect('#prt').innerHTML = prt

      htmlSelect('#b1').innerHTML = "Likes " + decrypt(localStorage.getItem('f2') as unknown as string)
    }
  }

  function op1() {
    if (htmlInput('#un1')?.value.length < 3) {
      const e = htmlSelect('#un1')
      e.style.border = '1px solid red'
      htmlSelect('#err1').innerHTML = 'Username must be at least 3 characters long'
      htmlInput('#un1')?.focus()
    } else {
      const e = htmlSelect('#un1')
      e.style.border = ''
    }
    if (htmlInput('#pw1')?.value.length < 6) {
      const e = htmlSelect('#pw1')
      e.style.border = '1px solid red'
      htmlSelect('#err1').innerHTML = 'Password must be at least 6 characters long'
      if (htmlInput('#un1')?.value.length >= 3) {
        htmlInput('#pw1')?.focus()
      }
    } else {
      const e = htmlSelect('#pw1')
      e.style.border = ''
    }
    if (htmlInput('#un1')?.value.length < 3 || htmlInput('#pw1')?.value.length < 6) {
      return
    }
    // Save to local storage
    localStorage.setItem('u1', encrypt(htmlInput('#un1')?.value))
    localStorage.setItem('p1', encrypt(htmlInput('#pw1')?.value))
    console.log(decrypt(localStorage.getItem('u1') as string))
    console.log(decrypt(localStorage.getItem('p1') as string))
    nextPage()
  }

  function op2() {
    if (htmlInput('#fs2')?.value === '') {
      const e = htmlSelect('#fs2')
      e.style.border = '1px solid red'
      htmlSelect('#err2').innerHTML = 'Please select a fruit'
      htmlInput('#fs2')?.focus()
    } else {
      const e = htmlSelect('#fs2')
      e.style.border = ''
    }
    if (htmlInput('#fs2')?.value === '') {
      return
    }
    // Save to local storage
    localStorage.setItem('f2', encrypt(htmlInput('#fs2')?.value))
    console.log(decrypt(localStorage.getItem('f2') as string))
    nextPage()
  }

  function op3() {
    if (value.length !== 4) {
      setFrerror(true)
      htmlSelect('#err3').innerHTML = 'The code must be 4 digits long'
      htmlInput('#pincode')?.focus()
    } if (value === '3456') {
      nextPage()
    }
    else {
      setFrerror(true)
      htmlSelect('#err3').innerHTML = 'Invalid code'
    }
  }

  function op4() {
    // Check ToC is at least 100 characters long
    if (htmlInput('#toc1')?.value.length < 100) {
      const e = htmlSelect('#toc1')
      e.style.border = '1px solid red'
      htmlSelect('#err4').innerHTML = 'The ToC must be at least 100 characters long'
      htmlInput('#toc1')?.focus()
      return
    }

    // Save to local storage
    localStorage.setItem('t1', encrypt(htmlInput('#toc1')?.value))
    console.log(decrypt(localStorage.getItem('t1') as string))
    nextPage()
  }

  function op5() {
    nextPage()
  }

  function op6() {
    if (htmlInput('#dubsn')?.value === '') {
      const e = htmlSelect('#dubsn')
      e.style.border = '1px solid red'
      htmlSelect('#err5').innerHTML = 'Please enter a number'
      htmlInput('#dubsn')?.focus()
      return
    } else if (Number(htmlInput('#dubsn')?.value) > 9999) {
      const e = htmlSelect('#dubsn')
      e.style.border = '1px solid red'
      htmlSelect('#err5').innerHTML = 'Liar.'
      htmlInput('#dubsn')?.focus()
      return
    } else {
      localStorage.setItem('d1', encrypt(htmlInput('#dubsn')?.value))
      console.log(decrypt(localStorage.getItem('d1') as string))
      nextPage()
    }
  }

  function op7() {
    nextPage()
  }

  function op8() {
    if (file === null) {
      setPfpErr('Please upload a file')
      return
    } else if (file.size > 10000000) {
      setPfpErr('Please upload a file smaller than 10MB')
      return
    }
    // Make png url
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const pfp = reader.result as string
      localStorage.setItem('pfp', encrypt(pfp))
      nextPage()
    }
  }

  const messages = [
    'Decoding DNA...',
    'Suctioning your RAM...',
    'Locating nearest rice pudding...',
    'Writing TypeScript...',
    'Importing Efficiency...',
    'Buying Enron Stock...',
    'Computing computer computations...',
    'Deleting my Twitter account...',
    'Summoning the spirit of Linus Torvalds...',
    'Predicting the future...',
    'Ordering a Chinese takeaway...',
  ]

  function load() {
    console.log('Loading...')
    if (localStorage.getItem('c')) {
      current = Number(localStorage.getItem('c') as string) - 1
      nextPage()
    } else {
      setTimeout(() => {
        htmlSelect('#loading').style.display = 'none'
        htmlSelect('#initial').style.display = 'block'
      }, 1000)
    }

    setInterval(() => {
      htmlSelect('#lts').innerHTML = messages[Math.floor(Math.random() * messages.length)]
    }, 3000)
  }

  const [frerror, setFrerror] = useState(false)
  const [terror] = useState(false)

  const [tip, setTip] = useState('')
  const [visible, setVisible] = useState(false)

  let t: NodeJS.Timeout;

  function changeTip() {
    if (visible) {
      setVisible(false)
      clearTimeout(t)
      return
    }
    const tips = [
      'When life gives you lemons, make a sour amaretto',
      'Code like you\'re wearing a nice hat',
      'An Apple Pencil is not a good investment, buy it now.',
      'Nobody needs an RTX 4090',
      'In the future, we will all be using Windows 11',
      'Python is a joke of a language, learn C',
      'Using Reddit makes you look so stupid',
      'Nobody respects Mac users, even when they\'re right',
      'You aren\' going to make the next big app, you could still try though',
      'You will use Windows, you will hate it, you will still use Windows',
      'The best way to get a headstart in the tech world is to be born rich',
      'Buy some thigh highs, they improve coding efficiency',
      'You don\'t need a NAS',
      'PirateSoftware is not a god, please stop treating him like one',
      'Sometimes the best people are the ones who are stupid',
      'I am Jimmy the Robot',
      'Get an Apple TV+ subscription, Ted Lasso is worth it',
      'If you code and you\'re fit, you don\'t code well',
    ]
    let newtip = tips[Math.floor(Math.random() * tips.length)]
    setTip(newtip)
    setVisible(true)
    console.log(newtip)
  }

  const [pfpErr, setPfpErr] = useState('')

  const [tosv, setTosv] = useState('')

  const [file, setFile] = useState<File | null>(null)

  let [value, setValue] = useState('')

  return (
    <MantineProvider>
      <Popover position='left' withArrow opened={visible}>
        <Popover.Target>
          <Tooltip label='Jimmy The Robot (Click For Wisdom)' position='bottom'>
            <ActionIcon id='bot' w={50} h={50} variant='gradient' gradient={{ from: 'blue', to: 'purple' }} radius='xl' style={{ position: 'fixed', bottom: '1em', right: '1em', zIndex: 1000, cursor: 'pointer' }} onClick={changeTip}><BiBot /></ActionIcon>
          </Tooltip>
        </Popover.Target>
        <Popover.Dropdown style={{ width: '50vw' }}>
          {tip}
        </Popover.Dropdown>
      </Popover>
      <Center h="100vh" p="1em">
        <Stack id='initial' w={400} style={{ display: 'none' }}>
          <Text style={{ fontSize: 50, fontWeight: 900, textAlign: 'center', userSelect: 'none' }}>Sign Up</Text>
          <Text size='sm' color='dimmed' style={{ textAlign: 'center' }}>A UI showcase / 'something' by <a href='https://benjs.uk' target='_blank' style={{ color: 'inherit', fontWeight: '600', textDecoration: 'none' }}>@benjs.uk</a></Text>
          <TextInput id='un1' label='Username' placeholder="Pick A Username" onKeyDown={(event) => {
            if (event.key === 'Enter') {
              op1()
            }
          }} required withAsterisk />
          <TextInput id='pw1' label='Password' placeholder="Pick A Password" onKeyDown={(event) => {
            if (event.key === 'Enter') {
              op1()
            }
          }} required withAsterisk />
          <Text size='sm' color='red' style={{ textAlign: 'center', marginTop: 5 }} id='err1'></Text>
          <Button type='submit' onClick={op1} style={{ marginTop: 5, width: '100%' }} color='blue'>Sign Up</Button>
        </Stack>
        <Stack id='loading' w={400}>
          <Center><Loader /></Center>
          <Text id="lts" size='sm' color='dimmed' style={{ textAlign: 'center', marginTop: 20 }}>Estimating Brain Size...</Text>
        </Stack>
        <Stack id='fruit' w={400} style={{ display: 'none' }}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>Please select your favourite of these fruits.</Text>
          <Card shadow='sm' radius='md' withBorder>
            <Select
              id='fs2'
              placeholder='Your Favourite Fruit'
              data={["Jabuticaba", "Salak", "Cupuacu", "Rambutan", "Longan", "Mangosteen", "Miracle Fruit", "Chempedak", "Lucuma", "Buddha’s Hand", "Sapodilla", "Ice Cream Bean", "Ackee", "Bacupari", "Santol", "Chokeberry", "Baobab Fruit", "Hala Fruit", "Calamansi", "Pawpaw"]}
              leftSection={<FaAppleAlt />}
            />
            <Text size='sm' color='red' style={{ textAlign: 'center', marginTop: 5 }} id='err2'></Text>
            <Button type='submit' style={{ marginTop: 5, width: '100%' }} onClick={op2} color='blue'>Submit</Button></Card>
        </Stack>
        <Stack id='code' w={400} style={{ display: 'none' }}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>Please enter the code we sent to your favourite fruit.</Text>
          <Card shadow='sm' radius='md' withBorder>
            <PinInput id='pincode' mask value={value} onChange={(value) => setValue(value)} type='number' error={frerror} style={{ justifyContent: 'center' }} onKeyDown={(e) => e.key === 'Enter' && op3()} />
            <Text size='sm' color='red' style={{ textAlign: 'center', marginTop: 5, marginBottom: 20 }} id='err3'></Text>
            <Button type='submit' style={{ marginTop: 5, width: '100%' }} color='blue' onClick={op3}>Submit</Button>
            <Center><Button w={400} variant='subtle' style={{ marginTop: 10 }} onClick={(e) => {
              let a = document.createElement('a')
              a.href = 'https://plufinder.com/plu/3456'
              a.target = '_blank'
              a.click()
              e.preventDefault()
            }}>What?</Button></Center></Card>
        </Stack>
        <Stack id='tocs' w={400} style={{ display: 'none' }}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>Please write the Terms and Conditions.</Text>
          <Card shadow='sm' radius='md' withBorder>
            <Textarea id='toc1' autosize minRows={10} mb={5} label='Terms and Conditions' placeholder='Please write the Terms and Conditions here' onKeyDown={(event) => {
              if (event.key === 'Enter') {
                op4()
              }
            }} required withAsterisk error={terror} />
            <Text size='sm' color='red' style={{ textAlign: 'center', margin: 2.5 }} id='err4'></Text>
            <Button type='submit' style={{ marginTop: 5, width: '100%' }} color='blue' onClick={op4}>Submit</Button>
          </Card>
        </Stack>
        <Stack id='tocs2' w={400} style={{ display: 'none' }}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>Do you agree to the Terms and Conditions?</Text>
          <Card shadow='sm' radius='md' withBorder>
            <Textarea id='toc2' autosize minRows={10} mb={5} value={tosv} />
            <Button type='submit' style={{ marginTop: 5, width: '100%' }} color='blue' onClick={op5}>Accept</Button>
          </Card>
        </Stack>
        <Stack id='dubs' w={400} style={{ display: 'none' }}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>How many doubloons do you have currently?</Text>
          <Card shadow='sm' radius='md' withBorder>
            <NumberInput id='dubsn' min={0} mb={5} placeholder='Doubloons' leftSection={<Image src='https://highseas.hackclub.com/doubloon.svg' width={25} height={25} />} />
            <Text size='sm' color='red' style={{ margin: 2.5 }} id='err5'></Text>
            <Button type='submit' style={{ marginTop: 5, width: '100%' }} color='blue' onClick={op6}>Submit</Button>
          </Card>
        </Stack>
        <Stack id='dubs2' w={400} style={{ display: 'none' }}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>Recommended Account Type</Text>
          <Card shadow='sm' radius='md' withBorder>
            <Text id='dubsRA' style={{ fontFamily: 'monospace', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}></Text>
            <Button type='submit' style={{ marginTop: 5, width: '100%' }} color='blue' onClick={op7}>Alright Then</Button>
          </Card>
        </Stack>
        <Stack id='optins' w={400} style={{ display: 'none' }}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>Do you want to opt in to the following services?</Text>
          <Card shadow='sm' radius='md' withBorder>
            <Stack>
              <Checkbox id='optin1' label='Bi-Weekly Soul Harvesting' />
              <Checkbox id='optin2' label='Good Vibes' />
              <Checkbox id='optin3' label='Telepathic Newsletter' />
              <Checkbox id='optin4' label='Complementary Paper Towel (To be delivered by or before 2086)' />
              <Checkbox id='optin5' label='Accidental Resuscitation' />
              <Button type='submit' style={{ marginTop: 5, width: '100%' }} color='blue' onClick={nextPage}>Submit</Button>
            </Stack>
          </Card>
        </Stack>
        <Stack id='pfp' w={400} style={{ display: 'none' }}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>Please upload a profile picture.</Text>
          <Card shadow='sm' radius='md' withBorder>
            <FileInput clearable id='pfp' label='Profile Picture' placeholder='Upload a Profile Picture' error={pfpErr} required accept="image/png" withAsterisk leftSection={<ImImage />} onChange={setFile} />
            <Button type='submit' style={{ marginTop: 5, width: '100%' }} color='blue' onClick={op8}>Submit</Button>
          </Card>
        </Stack>
        <Stack id='thanks' w={400} style={{ display: 'none' }}>
          <Text style={{ textAlign: 'center' }}>Thanks for your submission!</Text>
          <Text size='sm' style={{ textAlign: 'center', marginBottom: 20, marginTop: 5 }}>Here's your profile!</Text>
          <Card shadow='sm' radius='md' withBorder h={420} >
            <Center><Image id='pfpimg' alt='Profile Picture' style={{
              borderRadius: '50%', marginTop: 10
            }} /></Center>
            <Text id='pun' style={{ textAlign: 'center', fontSize: '2em', paddingLeft: '0.2em', fontWeight: 'bold', marginTop: 5 }}></Text>
            <Text size='sm' id='prt' style={{ textAlign: 'center', fontSize: '1.2em', paddingLeft: '0.2em', marginTop: 5 }}></Text>
            <Center>
              <Badge
                size='xl'
                variant='gradient'
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                style={{ marginTop: 20 }}
              >
                <Text id='b1' size='xl' style={{ fontWeight: 'bold', fontSize: '1em' }}></Text>
              </Badge>
            </Center>
            <Center>
              <Badge
                size='xl'
                variant='gradient'
                gradient={{ from: 'red', to: 'pink', deg: 90 }}
                style={{ marginTop: 20 }}
              >
                <Text size='xl' style={{ fontWeight: 'bold', fontSize: '1em' }}>Likes High Seas</Text>
              </Badge>
            </Center>
          </Card>
        </Stack>
      </Center>
      <Image w={1} h={0} src='https://i.imgur.com/0w9y4jA.png' style={{ position: 'fixed', bottom: '1em', right: '1em', zIndex: 1000, cursor: 'pointer' }} onLoad={load} />
    </MantineProvider >
  )
}

export default App

