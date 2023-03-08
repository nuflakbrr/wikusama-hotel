import { Room } from './room';

export interface TypeRoom {
  id_tipe_kamar: number;
  nama_tipe_kamar: string;
  slug: string;
  harga: number;
  deskripsi: string;
  foto: string;
  kamar: Room[];
}
