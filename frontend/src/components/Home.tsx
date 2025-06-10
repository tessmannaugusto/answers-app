import { Box } from '@mui/material';
import { AnswerForm } from './AnswerForm';
import { MyEndpoints } from './MyEndpoints';

export const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mt: 4,
        px: 4,
        height: 'calc(100vh - 64px)', // ajuste conforme seu header
        overflow: 'hidden',
      }}
    >
      {/* Formulário fixo à esquerda */}
      <Box sx={{ width: 400, flexShrink: 0 }}>
        <AnswerForm />
      </Box>

      {/* Lista à direita, com scroll se necessário */}
      <Box
        sx={{
          flex: 1,
          ml: 4,
          overflowY: 'auto',
          maxHeight: '100%',
          pr: 2,
        }}
      >
        <MyEndpoints />
      </Box>
    </Box>
  );
};
