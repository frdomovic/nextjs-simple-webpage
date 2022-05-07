import MeetupDetail from '../components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
import { Fragment } from 'react'
export default function MeetupDetails (props) {
  return (
    <Fragment>
      <Head>
        <title>Meetup</title>
        <meta name='description' content='List of Meetups' />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  )
}
export async function getStaticPaths () {
  const client = await MongoClient.connect(
    'mongodb+srv://chillsone:nokija.1313@cluster0.c3hzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupCollection = db.collection('nextjs_database')
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray()
  client.close()
  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: {
        meetupid: meetup._id.toString()
      }
    }))
  }
}

export async function getStaticProps (context) {
  const meetupId = context.params.meetupid
  const client = await MongoClient.connect(
    'mongodb+srv://chillsone:nokija.1313@cluster0.c3hzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupCollection = db.collection('nextjs_database')
  const meetup = await meetupCollection.findOne({ _id: ObjectId(meetupId) })
  client.close()
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image
      }
    }
  }
}
