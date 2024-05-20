import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize().then(async () => {
    const manager = AppDataSource.manager;

/**
 * Executes a transaction that saves a new user with a balance of 1000,
 * waits for 10 seconds, and then updates the user's balance to 2000.
 *
 * @return {Promise<void>} Promise that resolves when the transaction is complete.
 */
    async function function1(): Promise<void> {
        await manager.transaction(async transactionalEntityManager => {
            const user = new User();
            user.name = "John";
            user.balance = 1000;
            await transactionalEntityManager.save(user);

            console.log("[Function1]:	Operation A: User saved");

            // Simulating long operation
            await new Promise(resolve => setTimeout(resolve, 10000));

            user.balance = 2000;
            await transactionalEntityManager.save(user);
            console.log("[Function1]:	Operation B: User updated");
        });
    }

    /**
     * Asynchronously retrieves all users from the database and logs them to the console.
     *
     * @return {Promise<void>} A Promise that resolves when the function completes successfully or rejects with an error.
     */
    async function function2(): Promise<void> {
        try {
            const users = await manager.find(User);
            console.log("[Function 2]:	Users found", users);
        } catch (error) {
            console.error("[Function 2]:	Error", error);
        }
    }

/**
 * Executes function1 and then schedules function2 to be called after 5000 milliseconds (5 seconds).
 * The main purpose is to execute function2 while function1 is still running.
 *
 * @return {void} This function does not return anything.
 */
	function test(): void {
		function1();
		setTimeout(function2, 5000);
	}

	test();

}).catch(error => console.log(error));
