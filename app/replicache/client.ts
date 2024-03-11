import { Replicache, TEST_LICENSE_KEY, WriteTransaction } from "replicache";
import { BoardData, ColumnData, ItemData } from "~/replicache/data";

export const replicache = typeof window !== "undefined" ? new Replicache({
  name: "chat-user-id",
  licenseKey: TEST_LICENSE_KEY,
  pushURL: "/replicache/push",
  pullURL: "/replicache/pull",
  mutators: {
    createBoard: async (tx: WriteTransaction, args: BoardData) => {
      await tx.set(`board/${args.id}`, args);
    },
    updateBoard: async (
      tx: WriteTransaction,
      args: { id: string } & Partial<BoardData>
    ) => {
      const board = await tx.get<BoardData>(`board/${args.id}`);
      await tx.set(`board/${args.id}`, { ...board, ...args });
    },
    deleteBoard: async (tx: WriteTransaction, id: string) => {
      await tx.del(`board/${id}`);
    },
    createColumn: async (tx: WriteTransaction, args: ColumnData) => {
      await tx.set(`column/${args.id}`, args);
    },
    updateColumn: async (
      tx: WriteTransaction,
      args: { id: string } & Partial<ColumnData>
    ) => {
      const column = await tx.get<ColumnData>(`column/${args.id}`);
      await tx.set(`column/${args.id}`, { ...column, ...args });
    },
    deleteColumn: async (tx: WriteTransaction, id: string) => {
      await tx.del(`column/${id}`);
    },
    createCard: async (tx: WriteTransaction, args: ItemData) => {
      await tx.set(`card/${args.id}`, args);
    },
    updateCard: async (
      tx: WriteTransaction,
      args: { id: string } & Partial<ItemData>
    ) => {
      const card = await tx.get<ItemData>(`card/${args.id}`);
      await tx.set(`card/${args.id}`, { ...card, ...args });
    },
    deleteCard: async (tx: WriteTransaction, id: string) => {
      await tx.del(`card/${id}`);
    }
  }
}) : null;
