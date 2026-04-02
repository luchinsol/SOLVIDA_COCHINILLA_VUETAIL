<template>
  <div class="overflow-x-auto flex-1 bg-white border border-gray-200 rounded-xl">
    <table class="w-full whitespace-nowrap text-sm text-gray-700">
      <!-- HEADER -->
      <thead class="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
        <tr>
          <th class="px-4 py-3 text-left">Fecha / Hora</th>
          <th class="px-4 py-3 text-left">Tipo Mov.</th>
          <th class="px-4 py-3 text-left">Producto / Material</th>
          <th class="px-4 py-3 text-left">Lote</th>
          <th class="px-4 py-3 text-left">Ubicación</th>
          <th class="px-4 py-3 text-left">Documento Ref.</th>
          <th class="px-4 py-3 text-right">Cantidad</th>
          <th class="px-4 py-3 text-right">Saldo</th>
          <th class="px-4 py-3 text-left">Usuario</th>
          <th class="px-4 py-3 text-center">Acción</th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        <tr
          v-for="(item, index) in movimientos"
          :key="index"
          class="border-t hover:bg-gray-50 transition"
        >
          <!-- Fecha -->
          <td class="px-4 py-3">
            <div class="font-medium text-gray-900">{{ item.fecha }}</div>
            <div class="text-xs text-gray-500">{{ item.hora }}</div>
          </td>

          <!-- Tipo -->
          <td class="px-4 py-3">
            <span
              class="px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"
              :class="item.badge"
            >
              <i :class="item.icon"></i>
              {{ item.tipo }}
            </span>
          </td>

          <!-- Producto -->
          <td class="px-4 py-3">
            <div class="font-medium text-gray-900">{{ item.producto }}</div>
            <div class="text-xs text-gray-500">{{ item.codigo }}</div>
          </td>

          <!-- Lote -->
          <td class="px-4 py-3">
            <span class="text-blue-600 font-medium cursor-pointer hover:underline">
              {{ item.lote }}
            </span>
          </td>

          <!-- Ubicación -->
          <td class="px-4 py-3">
            <div class="text-sm">{{ item.ubicacion }}</div>
            <div class="text-xs text-gray-500">{{ item.subUbicacion }}</div>
          </td>

          <!-- Documento -->
          <td class="px-4 py-3">
            <div class="flex items-center gap-1 cursor-pointer hover:text-blue-600 text-gray-600">
              <i :class="item.docIcon"></i>
              <span>{{ item.documento }}</span>
            </div>
          </td>

          <!-- Cantidad -->
          <td class="px-4 py-3 text-right font-bold" :class="item.cantidadColor">
            {{ item.cantidad }}
          </td>

          <!-- Saldo -->
          <td class="px-4 py-3 text-right font-bold text-gray-900">
            {{ item.saldo }}
          </td>

          <!-- Usuario -->
          <td class="px-4 py-3">
            <div class="flex items-center gap-2">
              <img :src="item.avatar" class="w-6 h-6 rounded-full" alt="User" />
              <span class="text-sm">{{ item.usuario }}</span>
            </div>
          </td>

          <!-- Acción -->
          <td class="px-4 py-3 text-center">
            <button class="text-gray-400 hover:text-gray-700 p-1">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const movimientos = [
  {
    fecha: '29 Oct 2023',
    hora: '14:30:22',
    tipo: 'ENTRADA',
    producto: 'Extracto Líquido Cochinilla',
    codigo: 'EXT-LIQ-01',
    lote: 'EXT-2023-10-29-02',
    ubicacion: 'Planta Extracción',
    subUbicacion: 'Tanque T-105',
    documento: 'OP-2023-892',
    docIcon: 'fa-regular fa-file-lines',
    cantidad: '+ 450.00 kg',
    saldo: '1,250.00 kg',
    usuario: 'Miguel S.',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    badge: 'bg-green-100 text-green-700',
    icon: 'fa-solid fa-arrow-right-to-bracket',
    cantidadColor: 'text-green-600',
  },
  {
    fecha: '29 Oct 2023',
    hora: '10:15:00',
    tipo: 'SALIDA',
    producto: 'Cochinilla Grado A',
    codigo: 'MP-COCH-A',
    lote: 'MP-COCH-8922',
    ubicacion: 'Almacén MP',
    subUbicacion: 'Pasillo 2, Rack B',
    documento: 'REQ-PROD-445',
    docIcon: 'fa-regular fa-file-lines',
    cantidad: '- 100.00 kg',
    saldo: '900.00 kg',
    usuario: 'Carlos R.',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
    badge: 'bg-red-100 text-red-700',
    icon: 'fa-solid fa-arrow-right-from-bracket',
    cantidadColor: 'text-red-600',
  },
  {
    fecha: '28 Oct 2023',
    hora: '16:45:12',
    tipo: 'TRANSF.',
    producto: 'Carmín Laca 50%',
    codigo: 'PT-LAC-50',
    lote: 'LAC-2023-10-28-01',
    ubicacion: 'Planta → Almacén PT',
    subUbicacion: 'Zona Cuarentena',
    documento: 'TR-INT-102',
    docIcon: 'fa-solid fa-truck-ramp-box',
    cantidad: '50.00 kg',
    saldo: '50.00 kg',
    usuario: 'Ana M.',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
    badge: 'bg-blue-100 text-blue-700',
    icon: 'fa-solid fa-arrow-right-arrow-left',
    cantidadColor: 'text-gray-800',
  },
  {
    fecha: '28 Oct 2023',
    hora: '09:30:00',
    tipo: 'AJUSTE',
    producto: 'Ácido Cítrico',
    codigo: 'INS-AC-01',
    lote: 'L-AC-992',
    ubicacion: 'Almacén Insumos',
    subUbicacion: 'Rack C, Nivel 1',
    documento: 'AJ-INV-055',
    docIcon: 'fa-solid fa-clipboard-check',
    cantidad: '- 2.50 kg',
    saldo: '247.50 kg',
    usuario: 'Carlos R.',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
    badge: 'bg-yellow-100 text-yellow-700',
    icon: 'fa-solid fa-sliders',
    cantidadColor: 'text-red-600',
  },
  {
    fecha: '27 Oct 2023',
    hora: '11:20:45',
    tipo: 'ENTRADA',
    producto: 'Cochinilla Grado B',
    codigo: 'MP-COCH-B',
    lote: 'MP-COCH-8923',
    ubicacion: 'Almacén MP',
    subUbicacion: 'Zona Recepción',
    documento: 'GR-2023-1102',
    docIcon: 'fa-solid fa-file-invoice',
    cantidad: '+ 2,000.00 kg',
    saldo: '4,500.00 kg',
    usuario: 'Roberto V.',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
    badge: 'bg-green-100 text-green-700',
    icon: 'fa-solid fa-arrow-right-to-bracket',
    cantidadColor: 'text-green-600',
  },
]
</script>
