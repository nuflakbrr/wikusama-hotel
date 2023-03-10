import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import axios from '@/lib/axios';
import { bindingState } from '@/lib/bindingState';
import Navbar from '@/components/Common/Navbar/Navbar';
import Footer from '@/components/Common/Footer';

const ContainerLogin: FC = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [notifiedSuccess, setNotifiedSuccess] = useState<number>(0);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendData = { ...data };

    try {
      const res = await axios.post('/user/login', sendData);

      if (res.data.success === 1) {
        setNotifiedSuccess(1);

        localStorage.setItem('access', res.data.token);

        if (res.data.data.role === 'admin') {
          localStorage.setItem('admin', JSON.stringify(res.data.data));
          router.push('/admin/dashboard');
        } else {
          localStorage.setItem('resepsionis', JSON.stringify(res.data.data));
          router.push('/receptionist/dashboard');
        }
      } else {
        setNotifiedSuccess(2);
      }
    } catch (err) {
      setNotifiedSuccess(2);
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Masuk - Wikusama Hotel</title>
        <meta name="robots" content="follow, index" />
        <meta
          name="description"
          content="Selamat datang di Wikusama Hotel! Silahkan Masukkan Data Anda!"
        />
        <meta
          property="og:url"
          content="https://wikusamahotel.com/portal/login"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Wikusama Hotel" />
        <meta
          property="og:description"
          content="Selamat datang di Wikusama Hotel! Silahkan Masukkan Data Anda!"
        />
        <meta property="og:title" content="Masuk - Wikusama Hotel" />
        <meta
          property="og:image"
          content="http://wikusamahotel.com/assets/svg/undraw_login.svg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Masuk - Wikusama Hotel" />
        <meta
          name="twitter:description"
          content="Selamat datang di Wikusama Hotel! Silahkan Masukkan Data Anda!"
        />
        <meta
          name="twitter:image"
          content="http://wikusamahotel.com/assets/svg/undraw_login.svg"
        />
        <link rel="canonical" href="https://wikusamahotel.com/portal/login" />
      </Head>

      <Navbar />

      <main className="pt-20">
        <section className="py-24">
          <div className="max-w-6xl mx-auto">
            <div className="container">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="mb-10 lg:mb-0 w-full px-4 mx-5 lg:w-1/2">
                  <img
                    src="/assets/svg/undraw_login.svg"
                    loading="lazy"
                    alt="Hero Illustration"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="w-full px-4 mx-5 lg:w-1/2">
                  <div className="flex items-center justify-center mb-5">
                    <h1 className="font-primary font-semibold text-2xl lg:text-3xl text-center">
                      Selamat Datang!
                    </h1>
                  </div>

                  <form
                    className="bg-white rounded-lg shadow-lg p-8"
                    onSubmit={handleSubmit}
                  >
                    {notifiedSuccess === 1 && (
                      <div className="mb-4 bg-green-500 p-3 rounded">
                        <p className="text-white text-sm font-bold">
                          Login Sukses, Selamat datang kembali!
                        </p>
                      </div>
                    )}

                    {notifiedSuccess === 2 && (
                      <div className="mb-4 bg-red-500 p-3 rounded">
                        <p className="text-white text-sm font-bold">
                          Username atau Password salah, silakan coba kembali!
                        </p>
                      </div>
                    )}

                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="block text-slate-600 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary/70"
                        placeholder="Masukkan email"
                        autoFocus={true}
                        required
                        value={data.email}
                        onChange={(e) => bindingState(e, setData, 'email')}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="block text-slate-600 mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary/70"
                        placeholder="Masukkan password"
                        required
                        value={data.password}
                        onChange={(e) => bindingState(e, setData, 'password')}
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primarydark text-white py-2 rounded-lg font-bold transition duration-300 ease-in-out mt-3"
                      >
                        Masuk
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContainerLogin;
