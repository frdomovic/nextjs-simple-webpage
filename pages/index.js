import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'
import Head from 'next/head'
import { Fragment } from 'react'
export default function HomePage (props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='List of Meetups' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps () {
  const client = await MongoClient.connect(
    'mongodb+srv://chillsone:nokija.1313@cluster0.c3hzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupCollection = db.collection('nextjs_database')
  const meetups = await meetupCollection.find().toArray()

  client.close()
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  }
}
