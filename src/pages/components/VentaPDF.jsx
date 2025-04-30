import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  line: {
    marginBottom: 4,
  }
});

const VendaPDF = ({ venda }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Comprovante de Venda</Text>
        <Text style={styles.line}>ID: {venda.id}</Text>
        <Text style={styles.line}>Cliente: {venda.cliente?.fullname || 'Sem nome'}</Text>
        <Text style={styles.line}>Data: {venda.data || 'Sem data'}</Text>
        <Text style={styles.line}>Status: {venda.estado}</Text>
        <Text style={styles.line}>Total: R$ {venda.total}</Text>
      </View>

      {venda.itens?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.title}>Itens</Text>
          {venda.itens.map((item, index) => (
            <Text key={index} style={styles.line}>
              • {item.nome} — {item.quantidade}x — R$ {item.preco}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default VendaPDF;