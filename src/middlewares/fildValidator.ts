export default function validateField(field: string) {

  const sla = field === 'alta' ? 1 : field === 'media' ? 1 : field === 'baixa' ? 1 : 0

  return sla
}
