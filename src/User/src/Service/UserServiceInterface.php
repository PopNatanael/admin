<?php

namespace Frontend\User\Service;

use Dot\Mail\Exception\MailException;
use Frontend\User\Entity\Admin;
use Frontend\User\Entity\AdminInterface;

/**
 * Interface UserServiceInterface
 * @package Frontend\Admin\Service
 */
interface UserServiceInterface
{
    /**
     * @param array $data
     * @return AdminInterface
     * @throws \Exception
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function createUser(array $data): AdminInterface;

    /**
     * @param array $params
     * @return Admin|null
     */
    public function findOneBy(array $params = []): ?Admin;

    /**
     * @param string $email
     * @return array
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function getRoleNamesByEmail(string $email);

    /**
     * @param int $offset
     * @param int $limit
     * @param string|null $search
     * @param string $sort
     * @param string $order
     * @return array
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function getAdmins(
        int $offset = 0,
        int $limit = 30,
        string $search = null,
        string $sort = 'created',
        string $order = 'desc'
    );

    /**
     * @return array
     */
    public function getFormProcessedRoles();
}
