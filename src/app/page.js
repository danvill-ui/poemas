'use client'
import ContentPoet from '../components/_ContentPoet'

export default function Home() {


  return (
      <>
          <section className={'border-b-white flex-1 min-w-full overflow-y-hidden text-center content-center'}
                   style={{maxHeight: '70vh', width: 'auto', borderBottom: '3px dashed darkGrey'}}>
              <i className={'mx-auto font-serif text-3xl'}>POESÍA</i>
              <div className={'text-xl flex align-center justify-center my-7'}>
                  <img src={'./iconGit.svg'} className={'animate-pulse'} style={{maxHeight: '50vh'}}/></div>
              <span className={'mx-auto text font-bold mt-5'}>Verso Random</span>
          </section>
          <section className={'flex flex-1 justify-center align-items-center'}><h2>Poemas y otras palabras</h2></section>
          <section className={'flex flex-1 justify-center align-items-center'}><ContentPoet/></section>
          <section className={'flex flex-1 justify-center align-items-center'}><h2>Agenda</h2></section>
      </>


  );
}
