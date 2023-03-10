import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';

import axios from '@/lib/axios';
import { headerConfig } from '@/lib/headerConfig';
import { diffDays } from '@/lib/diffDays';
import { formatLocalTime } from '@/lib/formatLocalTime';
import { errorToast, successToast } from '@/lib/toast';
import { User } from '@/interfaces/user';
import { Customer } from '@/interfaces/customer';

type Props = {
  id_pemesanan: number;
  nomor_pemesanan: number;
  nama_tamu: string;
  nama_tipe_kamar: string;
  tgl_check_in: string;
  tgl_check_out: string;
  tgl_pemesanan: string;
  jumlah_kamar: number;
  status_pemesanan: string;
  user: User | Customer | any;
};

const BookingItem: FC<Props> = ({
  id_pemesanan,
  nomor_pemesanan,
  nama_tamu,
  nama_tipe_kamar,
  tgl_check_in,
  tgl_check_out,
  tgl_pemesanan,
  jumlah_kamar,
  status_pemesanan,
  user,
}) => {
  const router = useRouter();

  const handleDelete = async (id: any) => {
    alert('Apakah anda yakin ingin menghapus data ini?');

    await axios
      .delete(`/booking/${id}`, headerConfig())
      .then((res) => {
        res.data.status === 1
          ? successToast('Data berhasil dihapus!')
          : errorToast('Terjadi kesalahan saat menghapus data!');
      })
      .catch((err) => {
        errorToast('Terjadi kesalahan saat menghapus data!');
        console.log(err);
      });

    router.reload();
  };

  const badgeColorTransaction = (status: string) => {
    switch (status) {
      case 'check_out':
        return (
          <p className="border-2 border-green-500 bg-transparent px-2 py-0.5 rounded-xl text-green-500 text-center whitespace-no-wrap mt-2">
            Check-out
          </p>
        );
      case 'check_in':
        return (
          <p className="border-2 border-yellow-500 bg-transparent px-2 py-0.5 rounded-xl text-yellow-500 text-center whitespace-no-wrap mt-2">
            Check-in
          </p>
        );
      default:
        return (
          <p className="border-2 border-red-500 bg-transparent px-2 py-0.5 rounded-xl text-red-500 text-center whitespace-no-wrap mt-2">
            Baru
          </p>
        );
    }
  };

  return (
    <div className="container bg-gray-100 rounded-lg p-5 mb-5">
      <div className="flex justify-between">
        <section>
          <div className="text-left">
            <h1 className="font-bold text-sm text-slate-500">
              Nomor Pemesanan
            </h1>
            <h1 className="font-bold text-lg text-black">
              {nomor_pemesanan || 'Tidak diketahui'}
            </h1>
          </div>

          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Nama Pemesan</h1>
            <h1 className="font-bold text-lg text-black">
              {nama_tamu || 'Tidak diketahui'}
            </h1>
          </div>

          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">
              Nama Tipe Kamar
            </h1>
            <h1 className="font-bold text-lg text-black">
              {nama_tipe_kamar || 'Tidak diketahui'}
            </h1>
          </div>

          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Lama Menginap</h1>
            <h1 className="font-bold text-lg text-black">
              {`${diffDays(tgl_check_in, tgl_check_out)} hari` ||
                'Tidak diketahui'}
            </h1>
          </div>

          <div className="block md:hidden text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Jumlah Kamar</h1>
            <h1 className="font-bold text-lg text-black">
              {`${jumlah_kamar} kamar` || 'Tidak diketahui'}
            </h1>
          </div>

          <div className="block md:hidden text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">
              Tanggal Pemesanan
            </h1>
            <h1 className="font-bold text-lg text-black">
              {formatLocalTime(tgl_pemesanan) || 'Tidak diketahui'}
            </h1>
          </div>

          <div className="block md:hidden text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">
              Status Pemesanan
            </h1>
            <h1 className="font-bold text-lg text-black">
              {badgeColorTransaction(status_pemesanan) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        <section className="hidden md:block">
          <div className="text-left">
            <h1 className="font-bold text-sm text-slate-500">Jumlah Kamar</h1>
            <h1 className="font-bold text-lg text-black">
              {`${jumlah_kamar} kamar` || 'Tidak diketahui'}
            </h1>
          </div>

          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">
              Tanggal Pemesanan
            </h1>
            <h1 className="font-bold text-lg text-black">
              {formatLocalTime(tgl_pemesanan) || 'Tidak diketahui'}
            </h1>
          </div>

          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">
              Status Pemesanan
            </h1>
            <h1 className="font-bold text-lg text-black">
              {badgeColorTransaction(status_pemesanan) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        {user.role === 'admin' || user.role === 'resepsionis' ? (
          <section>
            <Link
              href={
                user?.role === 'admin'
                  ? `/admin/booking/detail/${id_pemesanan}`
                  : `/receptionist/booking/detail/${id_pemesanan}`
              }
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
            >
              <FaInfoCircle className="mr-2" /> Detail
            </Link>

            <Link
              href={
                user?.role === 'admin'
                  ? `/admin/booking/edit/${id_pemesanan}`
                  : `/receptionist/booking/edit/${id_pemesanan}`
              }
              className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2"
            >
              <FaEdit className="mr-2" /> Ubah
            </Link>

            {user?.role === 'admin' && (
              <button
                type="button"
                className="flex items-center justify-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2"
                onClick={() => handleDelete(id_pemesanan)}
              >
                <FaTrash className="mr-2" /> Hapus
              </button>
            )}
          </section>
        ) : (
          <section>
            <Link
              href={`/customer/booking/detail/${id_pemesanan}`}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
            >
              <FaInfoCircle className="mr-2" /> Detail
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default BookingItem;
